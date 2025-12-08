// Simple smart reply suggestions based on message content
const generateSmartReplies = (message) => {
  const lowerMessage = message.toLowerCase();
  
  // Question patterns
  if (lowerMessage.includes('how are you') || lowerMessage.includes('how r u')) {
    return ["I'm good, thanks!", "Doing great! You?", "All good here 😊"];
  }
  
  if (lowerMessage.includes('what') && lowerMessage.includes('doing')) {
    return ["Just chilling", "Working on something", "Not much, you?"];
  }
  
  if (lowerMessage.includes('where')) {
    return ["At home", "At work", "Out and about"];
  }
  
  if (lowerMessage.includes('when')) {
    return ["Soon", "Later today", "Tomorrow maybe"];
  }
  
  // Greeting patterns
  if (lowerMessage.match(/^(hi|hello|hey|hola)/)) {
    return ["Hey!", "Hi there!", "Hello! 👋"];
  }
  
  // Thanks patterns
  if (lowerMessage.includes('thank')) {
    return ["You're welcome!", "No problem!", "Anytime! 😊"];
  }
  
  // Agreement patterns
  if (lowerMessage.includes('agree') || lowerMessage.includes('right')) {
    return ["Exactly!", "I agree", "For sure"];
  }
  
  // Yes/No questions
  if (lowerMessage.endsWith('?')) {
    return ["Yes", "No", "Maybe", "Not sure"];
  }
  
  // Default replies
  return ["👍", "Okay", "Got it", "Sure thing"];
};

module.exports = { generateSmartReplies };
