// Define the types for Questions, Answers, and Comments
export interface Comment {
    id: number;
    user: string;
    text: string;
    timestamp: Date;
  }
  
  export interface Answer {
    id: number;
    user: string;
    text: string;
    timestamp: Date;
    comments: Comment[];
  }
  
  export interface Question {
    id: number;
    title: string;
    description: string;
    user: string;
    category: string[];
    isPopular: boolean;
    timestamp: Date;
    answers: Answer[];
  }
  
  // Sample data for questions, answers, and comments
  export const questions: Question[] = [
    {
      id: 1,
      title: "What is the difference between supervised and unsupervised learning?",
      description: "I am new to machine learning and would like to understand the key differences between supervised and unsupervised learning.",
      user: "JohnDoe",
      category: ["Machine Learning", "Deep Learning", "AI"],
      isPopular: true,
      timestamp: new Date(),
      answers: [
        {
          id: 1,
          user: "Alice",
          text: "Supervised learning uses labeled data, while unsupervised learning works with unlabeled data.",
          timestamp: new Date(),
          comments: [
            {
              id: 1,
              user: "Bob",
              text: "Good point! Also, supervised learning requires more data preprocessing.",
              timestamp: new Date(),
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "How does a neural network learn?",
      description: "Can someone explain how a neural network adjusts its weights during training?",
      user: "JaneSmith",
      category: ["Deep Learning", "Neural Networks"],
      isPopular: true,
      timestamp: new Date(),
      answers: [
        {
          id: 2,
          user: "Charlie",
          text: "A neural network learns by adjusting weights using backpropagation and gradient descent.",
          timestamp: new Date(),
          comments: [
            {
              id: 2,
              user: "David",
              text: "Yes! And learning rate plays a crucial role in this process.",
              timestamp: new Date(),
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: "What is data wrangling and why is it important?",
      description: "I keep hearing about data wrangling. Can someone explain what it is and why it's useful?",
      user: "MikeD",
      category: ["Data Cleaning"],
      isPopular: false,
      timestamp: new Date(),
      answers: [],
    },
    {
      id: 4,
      title: "How to handle missing data in a dataset?",
      description: "What are the best practices for handling missing values in data science?",
      user: "AnnaB",
      category: ["Data Cleaning", "Data Preprocessing"],
      isPopular: true,
      timestamp: new Date(),
      answers: [],
    },
    {
      id: 5,
      title: "What are feature selection techniques in machine learning?",
      description: "How do we decide which features to keep in a machine learning model?",
      user: "SarahK",
      category: ["Feature Engineering", "Machine Learning"],
      isPopular: false,
      timestamp: new Date(),
      answers: [],
    },
    {
      id: 6,
      title: "What is the bias-variance tradeoff?",
      description: "Can someone explain how bias and variance affect model performance?",
      user: "TomC",
      category: ["Machine Learning"],
      isPopular: true,
      timestamp: new Date(),
      answers: [],
    },
    {
      id: 7,
      title: "What is a recommendation system?",
      description: "How do recommendation systems work and what algorithms are used?",
      user: "LaraM",
      category: ["Recommender Systems", "Machine Learning"],
      isPopular: true,
      timestamp: new Date(),
      answers: [],
    },
    {
      id: 8,
      title: "How does natural language processing (NLP) work?",
      description: "Can someone explain the basics of NLP and its applications?",
      user: "NateW",
      category: ["Natural Language Processing", "AI"],
      isPopular: true,
      timestamp: new Date(),
      answers: [],
    },
    {
      id: 9,
      title: "What are some common data visualization techniques?",
      description: "I need to create visualizations for my dataset. What are the best techniques to use?",
      user: "RachelF",
      category: ["Data Visualization"],
      isPopular: false,
      timestamp: new Date(),
      answers: [],
    },
    {
      id: 10,
      title: "What is A/B testing and how is it used in data science?",
      description: "I’ve heard about A/B testing in marketing and data science. How does it work?",
      user: "JakeP",
      category: ["Experimentation", "Data Science"],
      isPopular: false,
      timestamp: new Date(),
      answers: [],
    }
  ];
  