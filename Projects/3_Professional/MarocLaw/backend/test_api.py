"""
Simple API test script
Run with: python test_api.py
"""
import requests
import json

BASE_URL = "http://localhost:8000"

def test_health():
    print("Testing health endpoint...")
    response = requests.get(f"{BASE_URL}/health")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}\n")

def test_signup():
    print("Testing signup...")
    response = requests.post(f"{BASE_URL}/api/auth/signup", json={
        "email": "test@example.com",
        "password": "test123",
        "full_name": "Test User"
    })
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        print(f"Response: {response.json()}\n")
    else:
        print(f"Error: {response.text}\n")

def test_login():
    print("Testing login...")
    response = requests.post(f"{BASE_URL}/api/auth/login", json={
        "email": "admin@legalmind.ai",
        "password": "admin123"
    })
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print(f"Token received: {data['access_token'][:20]}...\n")
        return data['access_token']
    else:
        print(f"Error: {response.text}\n")
        return None

def test_chat(token):
    print("Testing chat message...")
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.post(
        f"{BASE_URL}/api/chat/message",
        json={"content": "What is a contract?"},
        headers=headers
    )
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print(f"Answer: {data['answer'][:200]}...")
        print(f"Sources: {len(data['sources'])} sources found\n")
    else:
        print(f"Error: {response.text}\n")

def test_sessions(token):
    print("Testing get sessions...")
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(f"{BASE_URL}/api/chat/sessions", headers=headers)
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print(f"Sessions: {len(data)} sessions found\n")
    else:
        print(f"Error: {response.text}\n")

if __name__ == "__main__":
    print("=" * 50)
    print("LegalMind AI - API Test Suite")
    print("=" * 50)
    print()
    
    test_health()
    test_signup()
    token = test_login()
    
    if token:
        test_chat(token)
        test_sessions(token)
    
    print("=" * 50)
    print("Tests completed!")
    print("=" * 50)
