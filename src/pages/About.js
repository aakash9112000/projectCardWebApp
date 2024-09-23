import React from 'react';

const About = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>About This Application</h1>
      <p>
        This is a card management application where users can create, edit, and delete cards that contain media links. Cards are organized into customizable buckets, and users can manage and move them across different buckets.
      </p>
      <p>
        Technologies used: React, Redux, React Router, JSON Server, and Ant Design.
      </p>
    </div>
  );
}

export default About;
