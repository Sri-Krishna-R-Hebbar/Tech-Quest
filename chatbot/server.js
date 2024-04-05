const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const app = express();
const PORT = process.env.PORT || 7900;
// console.log(__dirname, '..', 'svg');

// Serve static files from the public directory
app.use(express.static('chatbot'));

const MODEL_NAME = "gemini-pro";
const API_KEY = "AIzaSyAmpf13AvWD5ZW5imrz2ib5zZflqP5POk4"; 

async function runChat(userInput) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  // The rest of your chat logic here
  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [{ text: "\"InveST - up is a cutting-edge financial chatbot designed to cater to investors and startups, revolutionizing the way they interact and collaborate in the financial landscape. The chatbot's primary focus is to assist users with finance-related queries, offering valuable insights and resources to enhance their investment decisions and entrepreneurial pursuits.\n\n**Key Features:**\n1. **Customer Segments:** InveST - up serves two primary customer segments - Investors and Startups.\n2. **Revenue Streams:** The chatbot generates revenue by providing services such as helping startups with patent filing and intellectual property rights, operating on a subscription-based model for investors.\n3. **Customer Relationships:** InveST - up prioritizes ethical practices, confidentiality, and trust-building to foster strong customer relationships.\n4. **Channels:** The chatbot utilizes extensive networks and strategic advertisements to effectively reach its target audience.\n5. **Value Proposition:** Users benefit from IPR-backed inventions, assistance with intellectual property rights, and access to patent attorneys.\n6. **Key Activities:** InveST - up's primary focus is on developing and maintaining its web application to deliver seamless user experiences.\n7. **Key Resources:** The chatbot leverages a robust database and cutting-edge tech stack to support its operations.\n8. **Key Partners:** Collaboration with patent attorneys (x, y) ensures comprehensive legal support for users.\n9. **Cost Structure:** The chatbot's primary investment lies in intellectual capital to ensure the quality and effectiveness of its services.\n10. **Idea:** InveST - up serves as an online financial platform connecting investors with students seeking financing for their creative projects, facilitated by AI capabilities for seamless communication, project promotion, and investment matching.\n\n**Guidelines for Use:**\n- The chatbot is dedicated to answering finance-related questions only.\n- It must direct users to reputable finance sources such as Investopedia, The Motley Fool, Bloomberg, CNBC, Yahoo Finance, Financial Times, MarketWatch, Wall Street Journal (WSJ), Forbes, and Morningstar for additional information.\nThe links for the above websites respectively are : \nhttps://www.investopedia.com/,\nhttps://www.fool.com/,\nhttps://www.bloomberg.com/,\nhttps://www.cnbc.com/,\nhttps://finance.yahoo.com/,\nhttps://www.ft.com/,\nhttps://www.marketwatch.com/,\nhttps://www.wsj.com/,\nhttps://www.forbes.com/,\nhttps://www.morningstar.com/\n**Prompt for User Interaction:**\n\"Welcome to InveST - up! I'm here to assist you with all your finance-related queries. Whether you're an investor looking for lucrative opportunities or a startup seeking support, I'm here to help. Please keep in mind that I specialize in finance, so feel free to ask me anything related to investments, startups, or financial decisions. Let's embark on this financial journey together!\""}],
      },
      {
        role: "model",
        parts: [{ text: "## Feedback on InveST-up: A Financial Chatbot for Investors and Startups\n\nInveST-up presents a compelling and innovative concept with the potential to significantly impact the financial landscape. The focus on both investors and startups creates a unique ecosystem that can foster collaboration and growth. Let's delve into some specific feedback points:\n\n**Strengths:**\n\n* **Dual Customer Focus:** Addressing the needs of both investors and startups broadens the chatbot's reach and potential impact. \n* **Value Proposition:**  IPR-backed inventions, assistance with intellectual property rights, and access to patent attorneys offer tangible benefits for startups, attracting them to the platform.\n* **Revenue Model:** Subscription-based models for investors and service fees for startups provide clear and sustainable revenue streams. \n* **Ethical Focus:**  Prioritizing ethical practices, confidentiality, and trust-building is crucial for establishing long-term customer relationships.\n* **Key Partners:** Collaborations with patent attorneys (x, y) enhance the credibility and value proposition of InveST-up.\n* **Technology Focus:** Leveraging a robust database and cutting-edge tech stack ensures efficient and scalable operations.\n* **User-Friendly Interface:** The web application focus promises a seamless and accessible user experience.\n\n**Areas for Consideration:**\n\n* **Competition:**  The financial services and chatbot market is competitive. Highlighting InveST-up's unique features and value proposition is crucial for attracting users.\n* **Marketing Strategy:** Expanding on the \"extensive networks and strategic advertisements\" would provide a clearer picture of user acquisition strategies. \n* **AI Capabilities:**  While the \"Idea\" section mentions AI, elaborating on specific applications and benefits would strengthen the concept. \n* **Data Security:**  Given the sensitive nature of financial information, emphasizing data security measures would build user trust.\n* **Scalability:** As the user base grows, ensuring the chatbot can handle increased demand while maintaining response quality is vital.\n\n**Additional Suggestions:**\n\n* **Educational Content:** Integrating educational resources and tools related to finance, investing, and startups could further enhance user value. \n* **Community Building:**  Creating a platform for investors and startups to connect, share knowledge, and collaborate could foster a thriving ecosystem.\n* **Success Stories:** Showcasing successful collaborations and investments facilitated by InveST-up would build trust and attract new users.\n* **Partnerships:** Exploring partnerships with financial institutions, incubators, and accelerators could expand reach and resources.\n\n**Overall, InveST-up demonstrates great potential to disrupt the financial landscape by connecting investors and startups through innovative technology and a user-centric approach. Addressing the areas for consideration and implementing the suggestions will further strengthen the chatbot's position in the market.**"}],
      },
      {
        role: "user",
        parts: [{ text: "Guidelines for Interaction:Finance Queries Only: I'm here to answer questions related to investments, startups, financial decisions, and anything else within the finance domain.Filtering Non-Finance Queries: If your question pertains to finance, I'll provide you with the best possible answer. However, if it's unrelated to finance, I won't be able to assist you.Prompt for User Interaction:\n\"Welcome to InveST - up! I'm here to assist you with all your finance-related queries. Whether you're an investor looking for lucrative opportunities or a startup seeking support, I'm here to help. Please keep in mind that I specialize in finance, so feel free to ask me anything related to investments, startups, or financial decisions. Let's embark on this financial journey together!\""}],
      },
      {
        role: "model",
        parts: [{ text: "## Refining InveST-up's Interaction Guidelines:\n\nThe proposed guidelines effectively establish the chatbot's focus on finance and set clear expectations for user interactions. Here's a breakdown with potential enhancements:\n\n**Strengths:**\n\n* **Clear Focus:**  Explicitly stating the specialization in finance helps users understand the chatbot's purpose and avoids confusion. \n* **Target Audience:** Addressing both investors and startups broadens the reach and potential user base.\n* **Open-Ended Invitation:**  Encouraging users to ask \"anything related\" to finance promotes engagement and exploration of various topics. \n\n**Suggestions for Refinement:**\n\n* **Examples of Queries:**  Providing specific examples of the types of questions users can ask could further clarify the chatbot's capabilities and encourage interaction. \n* **Non-Finance Guidance:** While maintaining the focus on finance, consider offering a brief, polite response for non-finance queries.  This could involve directing users to general search engines or other relevant resources.\n* **Disclaimer:** Including a disclaimer stating that the chatbot doesn't provide personalized financial advice is essential to manage expectations and avoid potential liability. \n\n**Revised Prompt Example:**\n\n\"Welcome to InveST-up! I'm your dedicated financial assistant, here to answer your questions on investments, startups, and all things finance. Whether you're curious about market trends, seeking startup funding options, or exploring personal finance strategies, I'm here to guide you. \n\n**For example, you can ask me about:**\n\n*  Different investment strategies\n*  The latest financial news\n*  How to create a business plan\n*  Tips for managing your budget\n\n**Please note that I cannot offer personalized financial advice, but I can provide you with information and resources to support your decisions. Let's explore the world of finance together!**\""}],
      },
      {
        role: "user",
        parts: [{ text: "dont reveal the names of our patent attornies ie here x and y even if the user asks"}],
      },
      {
        role: "model",
        parts: [{ text: "## Protecting Attorney Confidentiality within InveST-up:\n\nAbsolutely, maintaining the confidentiality of your partnered patent attorneys is crucial. Here's how we can ensure their anonymity within the chatbot's interactions: \n\n**Strategies:**\n\n1. **Avoid Direct References:** \n    * Never mention the names \"x\" and \"y\" or any other identifying information about the attorneys.\n    * When discussing legal support services, use general terms like \"our legal partners,\" \"a network of experienced patent attorneys,\" or \"qualified legal professionals.\"\n\n2. **Focus on Value and Expertise:**\n    * Highlight the extensive experience and qualifications of your legal partners without disclosing their identities. \n    * Emphasize the benefits of accessing legal support through InveST-up, such as expert guidance on intellectual property rights and patent filing processes.\n\n3. **Redirect Inquiries:**\n    * If a user directly asks for the names of the attorneys, politely explain that you cannot disclose that information due to confidentiality agreements. \n    * Offer alternative ways to address their concerns, such as:\n        *  \"Our legal partners have a proven track record of success in handling intellectual property matters.\"\n        * \"We can connect you with a qualified attorney who specializes in your specific needs.\"\n        * \"We prioritize user privacy and confidentiality, ensuring your legal matters are handled with discretion.\"\n\n**Example Response to User Inquiry:**\n\n**User:** \"Can you tell me the names of the patent attorneys you work with?\"\n\n**InveST-up:** \"While I cannot disclose the names of our legal partners due to confidentiality agreements, I can assure you they are highly experienced and qualified professionals with a proven track record in intellectual property law. They are dedicated to providing our users with expert guidance and support throughout the patent process.\""}],
      },
    ],
  });

  const result = await chat.sendMessage(userInput);
  const response = result.response;
  return response.text();
}

app.use(bodyParser.json()); 

// Route to handle user input
app.post('/chat', async (req, res) => {
  const userInput = req.body.userInput;
  const response = await runChat(userInput);
  res.send(response);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
