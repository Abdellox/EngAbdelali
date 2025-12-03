// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingContract {
    struct Election {
        string title;
        uint256 startTime;
        uint256 endTime;
        bool active;
        mapping(address => bool) hasVoted;
        mapping(bytes32 => uint256) voteCounts;
        bytes32[] candidateIds;
    }

    struct Vote {
        bytes32 electionId;
        bytes encryptedVote;
        bytes signature;
        uint256 timestamp;
        bytes32 receiptHash;
    }

    mapping(bytes32 => Election) public elections;
    mapping(bytes32 => Vote) public votes;
    mapping(address => bool) public authorizedOfficials;
    
    address public admin;
    uint256 public totalElections;
    
    event ElectionCreated(bytes32 indexed electionId, string title, uint256 startTime, uint256 endTime);
    event VoteSubmitted(bytes32 indexed electionId, bytes32 indexed receiptHash, uint256 timestamp);
    event ElectionFinalized(bytes32 indexed electionId, uint256 totalVotes);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier onlyAuthorized() {
        require(authorizedOfficials[msg.sender] || msg.sender == admin, "Not authorized");
        _;
    }

    constructor() {
        admin = msg.sender;
        authorizedOfficials[msg.sender] = true;
    }

    function createElection(
        bytes32 _electionId,
        string memory _title,
        uint256 _startTime,
        uint256 _endTime,
        bytes32[] memory _candidateIds
    ) public onlyAuthorized {
        require(_startTime < _endTime, "Invalid time range");
        require(elections[_electionId].startTime == 0, "Election already exists");

        Election storage newElection = elections[_electionId];
        newElection.title = _title;
        newElection.startTime = _startTime;
        newElection.endTime = _endTime;
        newElection.active = true;
        newElection.candidateIds = _candidateIds;

        totalElections++;
        emit ElectionCreated(_electionId, _title, _startTime, _endTime);
    }

    function submitVote(
        bytes32 _electionId,
        bytes memory _encryptedVote,
        bytes memory _signature,
        bytes32 _receiptHash
    ) public {
        Election storage election = elections[_electionId];
        
        require(election.active, "Election not active");
        require(block.timestamp >= election.startTime, "Election not started");
        require(block.timestamp <= election.endTime, "Election ended");
        require(!election.hasVoted[msg.sender], "Already voted");

        election.hasVoted[msg.sender] = true;

        votes[_receiptHash] = Vote({
            electionId: _electionId,
            encryptedVote: _encryptedVote,
            signature: _signature,
            timestamp: block.timestamp,
            receiptHash: _receiptHash
        });

        emit VoteSubmitted(_electionId, _receiptHash, block.timestamp);
    }

    function tallyVote(bytes32 _electionId, bytes32 _candidateId) public onlyAuthorized {
        Election storage election = elections[_electionId];
        require(block.timestamp > election.endTime, "Election still ongoing");
        
        election.voteCounts[_candidateId]++;
    }

    function getVoteCount(bytes32 _electionId, bytes32 _candidateId) public view returns (uint256) {
        return elections[_electionId].voteCounts[_candidateId];
    }

    function hasVoted(bytes32 _electionId, address _voter) public view returns (bool) {
        return elections[_electionId].hasVoted[_voter];
    }

    function verifyVote(bytes32 _receiptHash) public view returns (bool, uint256) {
        Vote memory vote = votes[_receiptHash];
        return (vote.timestamp > 0, vote.timestamp);
    }

    function finalizeElection(bytes32 _electionId) public onlyAuthorized {
        Election storage election = elections[_electionId];
        require(block.timestamp > election.endTime, "Election still ongoing");
        
        election.active = false;
        
        uint256 totalVotes = 0;
        for (uint i = 0; i < election.candidateIds.length; i++) {
            totalVotes += election.voteCounts[election.candidateIds[i]];
        }
        
        emit ElectionFinalized(_electionId, totalVotes);
    }

    function addAuthorizedOfficial(address _official) public onlyAdmin {
        authorizedOfficials[_official] = true;
    }

    function removeAuthorizedOfficial(address _official) public onlyAdmin {
        authorizedOfficials[_official] = false;
    }
}
