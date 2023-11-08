import React, { useContext, useEffect } from "react";

import { Container, Wrapper, CreateSetButton } from "./Dashboard.elements";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import { AuthContext } from "../../../context";

import { useNavigate } from "react-router-dom";

import Set from "../Set/Set";

const sets = [
  {
    title: "Introduction to JavaScript",
    description:
      "This class covers the basics of JavaScript programming, including variables, data types, functions, and control structures.",
    totalTerms: 100,
    mastered: 30
  },
  {
    title: "Advanced JavaScript",
    description:
      "This class covers more advanced topics in JavaScript programming, including object-oriented programming, regular expressions, and error handling.",
    totalTerms: 150,
    mastered: 60
  },
  {
    title: "HTML and CSS",
    description:
      "This class covers the basics of HTML and CSS, including elements, attributes, selectors, and styling.",
    totalTerms: 120,
    mastered: 40
  },
  {
    title: "Responsive Web Design",
    description:
      "This class covers the principles of responsive web design, including fluid layouts, flexible media, and breakpoints.",
    totalTerms: 80,
    mastered: 20
  },
  {
    title: "Node.js",
    description:
      "This class covers the basics of Node.js, including event-driven programming, asynchronous I/O, and the Node.js runtime environment.",
    totalTerms: 90,
    mastered: 30
  },
  {
    title: "Express.js",
    description:
      "This class covers the basics of Express.js, including routing, middleware, and templates.",
    totalTerms: 110,
    mastered: 50
  },
  {
    title: "React",
    description: "This class covers the basics of React, including components, props, and state.",
    totalTerms: 100,
    mastered: 40
  },
  {
    title: "React Native",
    description:
      "This class covers the basics of React Native, including components, layouts, and the React Native API.",
    totalTerms: 120,
    mastered: 60
  },
  {
    title: "Vue.js",
    description:
      "This class covers the basics of Vue.js, including components, templates, and directives.",
    totalTerms: 100,
    mastered: 30
  },
  {
    title: "Angular",
    description:
      "This class covers the basics of Angular, including components, templates, and services.",
    totalTerms: 110,
    mastered: 40
  },
  {
    title: "Python Fundamentals",
    description:
      "This class covers the basics of Python programming, including variables, data types, control structures, and functions.",
    totalTerms: 150,
    mastered: 50
  },
  {
    title: "Python Data Science",
    description:
      "This class covers the basics of data science in Python, including NumPy, Pandas, and Matplotlib.",
    totalTerms: 120,
    mastered: 60
  },
  {
    title: "Machine Learning with Python",
    description:
      "This class covers the basics of machine learning in Python, including supervised learning, unsupervised learning, and neural networks.",
    totalTerms: 200,
    mastered: 80
  },
  {
    title: "Java Fundamentals",
    description:
      "This class covers the basics of Java programming, including variables, data types, control structures, and classes.",
    totalTerms: 150,
    mastered: 60
  },
  {
    title: "Java Web Development",
    description:
      "This class covers the basics of web development in Java, including servlets, JSP, and Spring.",
    totalTerms: 120,
    mastered: 40
  }
];

export default function Dashboard() {
  const currentUser = useContext(AuthContext);
  const navigate = useNavigate();

  const goToCreateSetView = () => {
    navigate("/create");
  };

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  return (
    <Container>
      <Wrapper>
        <h4>Recently studied</h4>
        <div className="recent-sets set-container">
          <Set set={sets[0]} />
          <Set set={sets[1]} />
        </div>

        <CreateSetButton onClick={goToCreateSetView}>
          <FontAwesomeIcon icon={faPlusCircle} className="button-icon" />
          <span className="button-label">Create new set</span>
        </CreateSetButton>
      </Wrapper>
    </Container>
  );
}
