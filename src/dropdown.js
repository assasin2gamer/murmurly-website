import { useState } from "react";

export default function DropdownCards() {
  const faqs = [
    {
      question: "What is Murmurly?",
      answer:
        "Murmurly is a real-time AI assistant that provides a ground up data intelligence platform, assisting you in meetings, modeling, reports, and more."
    },
    {
      question: "I have data sources already, how do I connect?",
      answer:
        "We are aiming to connect to all major platforms including Bloomberg, CapIQ, Refintiv, Excel, ect. Feel free to reach out with specific requests!"
    },
    {
      question: "How do I install it?",
      answer:
        "Join the waitlist. We’ll send you our beta-invite."
    },
    {
      question: "Latency, Data Privacy, and Security",
      answer:
        "Our product is intended to run in a hybrid, on-compute and cloud compute environment. If you require on-prem processing, we can accommodate that based on your compute needs. We will not be accessing or training with your data unless specifically authorized."
    },
    {
      question: "Can I customize the features",
      answer:
        "Yes. You’ll be able to create custom nodes and integrations. We are actively building a C++ and Python SDK. If you have specific requests, please reach out!"
    },
    {
      question: "Can my team use it together?",
      answer:
        "Yes. As long as the external data licenses you obtain allow for shared use."
    },
    {
      question: "What does it cost?",
      answer:
        "Final pricing depends on usage, seats, and integrations."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div
      style={{
        backgroundColor: "white",
        minHeight: "100vh",
        zIndex: 5,
        position: "relative",
        padding: "40px",
        maxWidth: "90vw",
       
      }}
    >
      {faqs.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              marginBottom: "12px",
              overflow: "hidden"
            }}
          >
            <button
              onClick={() =>
                setOpenIndex(isOpen ? null : index)
              }
              style={{
                width: "100%",
                textAlign: "left",
                padding: "16px 20px",
                backgroundColor: "white",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: 600,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              {item.question}
              <span
                style={{
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease"
                }}
              >
                ▼
              </span>
            </button>

            {isOpen && (
              <div
                style={{
                  padding: "0 20px 16px 20px",
                  fontSize: "15px",
                  lineHeight: 1.6,
                  color: "#374151"
                }}
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
