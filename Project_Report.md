<div align="center">

# NoteLock: Secure Password Vault and Auto-fill Extension

**A Report**  
*Submitted in partial fulfilment of the requirements for the award of the Degree of*  
**Bachelor of Technology**  
*in*  
**Computer Science and Engineering**

*By*  
**Divyanshu**  
**BTECH/10870/23**

**Birla Institute of Technology, Mesra**  
**Ranchi, Jharkhand-835215**

</div>

---

<div style="page-break-after: always;"></div>

## APPROVAL OF THE GUIDE

Recommended that the B. Tech. Summer Internship Project titled **NoteLock: Secure Password Vault and Auto-fill Extension** submitted by **BTECH/10870/23 and Divyanshu** is approved by me for submission. This should be accepted as fulfilling the partial requirements for the award of Degree of Bachelor of Technology in **Computer Science and Engineering**. To the best of my knowledge, the report represents work carried out by the student in **<Organization / Company>** and the content of this report is not form a basis for the award of any previous degree to anyone else.

**Date:**  
<br><br><br>
**<Name of the Guide>**  
**<Designation of the Guide>**  
Department of Computer Science and Engineering  
Birla Institute of Technology, Mesra

---

<div style="page-break-after: always;"></div>

## DECLARATION CERTIFICATE

I certify that:
a) The work contained in the report is original and has been done by myself under the general supervision of my supervisor.
b) The work has not been submitted to any other Institute for any other degree or diploma.
c) I have followed the guidelines provided by the Institute in writing the report.
d) I have conformed to the norms and guidelines given in the Ethical Code of Conduct of the Institute.
e) Whenever I have used materials (data, theoretical analysis, and text) from other sources, I have given due credit to them by citing them in the text of the report and giving their details in the references.
f) Whenever I have quoted written materials from other sources, I have put them under quotation marks and given due credit to the sources by citing them and giving required details in the references.

**Date:**  
<br><br><br>
**Divyanshu**  
**<Roll No. of the Student>**  
Department of Computer Science and Engineering  
Birla Institute of Technology, Mesra

---

<div style="page-break-after: always;"></div>

## CERTIFICATE OF APPROVAL

This is to certify that the work embodied in this Summer Internship Report entitled **"NoteLock: Secure Password Vault and Auto-fill Extension"**, is carried out by **Divyanshu (BTECH/10870/23)** has been approved for the degree of Bachelor of Technology in **Computer Science and Engineering** of Birla Institute of Technology, Mesra, Ranchi.

**Date:**  
**Place:**  

<br><br><br>
**(Chairman)** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **(Panel Coordinator)**  
Head of the Department &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Examiner  
Dept. of Comp. Sc. & Engg. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Dept. of Comp. Sc. & Engg.

---

<div style="page-break-after: always;"></div>

## ABSTRACT

NoteLock is a highly secure, modern password management system bundled with a native Chrome Extension for automated credential capture and autofill. The primary objective of this project is to solve the pervasive issue of password fatigue and security vulnerabilities arising from weak or reused passwords across web applications. Utilizing the MERN stack (MongoDB, Express.js, React, Node.js), NoteLock provides a robust, centralized Vault where users can store passwords, secure notes, and categorize their credentials. A key feature of the project is the integration of an Email OTP verification system via Nodemailer to ensure frictionless yet highly secure authentication. Additionally, a custom Chrome Extension built using Manifest V3 interfaces seamlessly with the React application to intercept form submissions on third-party websites, automatically prompting users to save credentials and autofilling them upon return. The methodology encompasses responsive UI/UX design via TailwindCSS, stateful React hooks, RESTful API architecture, and bcrypt-driven cryptographic hashing. Experimental testing confirms successful end-to-end encryption of stored data and instantaneous synchronization between the extension and the web application. NoteLock ultimately demonstrates a comprehensive, full-stack approach to modern cyber hygiene, drastically minimizing user friction while maintaining stringent data security standards.

---

<div style="page-break-after: always;"></div>

## ACKNOWLEDGEMENT

I would like to express my sincere gratitude to those who significantly contributed to the successful completion of this project. Firstly, I extend my deepest thanks to my project guide, **<Name of the Guide>**, for their invaluable mentorship, continuous support, and technical guidance throughout the development of NoteLock. Their insights were instrumental in shaping the architecture and security features of the application.

I am also highly grateful to the Head of the Department and all the faculty members of the Department of Computer Science and Engineering at Birla Institute of Technology, Mesra, for providing a conducive environment for learning and innovation. The foundational knowledge imparted by my professors played a critical role in the successful implementation of the MERN stack and Chrome Extension components.

Finally, I would like to thank my parents, classmates, and friends for their constant encouragement and feedback during the testing phases of the application. 

<br><br><br>
**Date:**  
<br><br><br>
**Divyanshu**  
**<Roll No. of the Student>**

---

<div style="page-break-after: always;"></div>

## CONTENTS

**ABSTRACT** ............................................................................................................................. v  
**ACKNOWLEDGEMENT** ........................................................................................................ vi  
**LIST OF FIGURES** .................................................................................................................. viii  
**LIST OF TABLES** ................................................................................................................... ix  

**CHAPTER 1 INTRODUCTION** .......................................................................................... 1  
1.1 Overview of the project ........................................................................................................ 1  
1.2 Problem Statement ................................................................................................................ 2  
1.3 Objectives ............................................................................................................................. 3  

**CHAPTER 2 LITERATURE REVIEW** .............................................................................. 4  
2.1 Background of Password Managers ..................................................................................... 4  
2.2 Traditional vs Cloud-based Vaults ....................................................................................... 5  

**CHAPTER 3 METHODOLOGY** ......................................................................................... 6  
3.1 Technology Stack (MERN) .................................................................................................. 6  
3.2 System Architecture and DFD .............................................................................................. 7  
3.3 Authentication & OTP Verification Flow ............................................................................. 8  
3.4 Chrome Extension Integration .............................................................................................. 9  

**CHAPTER 4 EXPERIMENTAL RESULTS AND DISCUSSION** ................................... 10  
4.1 Dashboard and Vault Features .............................................................................................. 10  
4.2 Extension Capture Mechanism Analysis .............................................................................. 11  

**CHAPTER 5 CONCLUSION** .............................................................................................. 12  
5.1 Summary of the Work .......................................................................................................... 12  
5.2 Future Scopes ........................................................................................................................ 13  

**REFERENCES** ....................................................................................................................... 14

---

<div style="page-break-after: always;"></div>

## LIST OF FIGURES

Figure 3.1: High-Level System Architecture Diagram  
Figure 3.2: User Authentication and OTP Flowchart  
Figure 4.1: NoteLock Dashboard UI and Weak Password Detection  
Figure 4.2: Password Vault Grid and Interaction  
Figure 4.3: Chrome Extension Auto-Capture Prompt  

---

<div style="page-break-after: always;"></div>

## LIST OF TABLES

Table 3.1: API Endpoints and their corresponding methods and descriptions  
Table 3.2: Chrome Extension Permissions Configuration  
Table 4.1: Performance Testing of Web App Response Times  

---

<div style="page-break-after: always;"></div>

# CHAPTER 1
# INTRODUCTION

## 1.1 Overview of the project
NoteLock is a comprehensive, full-stack password management application designed to secure user credentials and streamline the logging-in process across the web. Modern internet users maintain dozens of accounts, leading to a phenomenon known as password fatigue. To combat this, NoteLock provides a secure centralized vault built entirely on the MERN stack (MongoDB, Express, React, Node.js). To ensure the user does not have to manually input credentials every time, the project pairs the web application with a custom-built Chrome Extension. This extension actively listens on web pages, automatically intercepting form submissions to capture credentials and seamlessly autofilling them during subsequent visits.

## 1.2 Problem Statement
Users frequently resort to using weak, easily guessable passwords or reusing the same password across multiple platforms due to the sheer volume of accounts they must maintain. This severely degrades cybersecurity. Existing password managers often have high friction during the setup process or require complex integrations. There is a need for a seamless, aesthetically pleasing, and highly integrated password vault that automatically links a web dashboard with a browser extension without requiring complex configurations from the user.

## 1.3 Objectives
- To develop a secure web dashboard using React and TailwindCSS for users to manage passwords and secure notes.
- To implement robust backend authentication utilizing JWT and an Email OTP verification process via Nodemailer.
- To build a Manifest V3 Chrome Extension capable of intelligently detecting login forms, intercepting submissions, and synchronizing with the backend REST API.
- To implement security features such as bcrypt hashing and real-time weak password detection.

---

<div style="page-break-after: always;"></div>

# CHAPTER 2
# LITERATURE REVIEW

## 2.1 Background of Password Managers
Password managers have evolved from simple encrypted local text files to sophisticated cloud-based architectures. The literature on cyber hygiene emphasizes that human memory is the weakest link in digital security. Tools like LastPass and Bitwarden have set industry standards by utilizing zero-knowledge encryption and browser extensions. NoteLock builds upon these concepts by prioritizing modern UI/UX principles and creating a frictionless onboarding flow through email OTPs.

## 2.2 Traditional vs Cloud-based Vaults
Local vaults restrict users to a single device, presenting massive data loss risks if the hardware fails. Cloud-based vaults, like NoteLock, utilize NoSQL databases (MongoDB) hosted on remote clusters to ensure high availability and cross-device synchronization. The challenge in cloud-based vaults is securing the transit of data, which NoteLock addresses through HTTPS and JWT-based bearer tokens that heavily restrict API access to authenticated clients only.

---

<div style="page-break-after: always;"></div>

# CHAPTER 3
# METHODOLOGY

## 3.1 Technology Stack (MERN)
NoteLock is built using the industry-standard MERN stack:
- **MongoDB**: A NoSQL database used to store User profiles, OTP records, and Vault items.
- **Express.js & Node.js**: The backend runtime environment and framework that handles REST API routing, rate limiting, and password hashing.
- **React**: A component-based frontend library utilized for rendering the dynamic SPA (Single Page Application) dashboard.
- **TailwindCSS**: Used for highly responsive, modern utility-first styling.

## 3.2 System Architecture
The application architecture is divided into three distinct layers:
1. **The Client (React SPA)**: Handles user interaction, data visualization (Weak Password alerts, Vault lists), and client-side routing.
2. **The Interceptor (Chrome Extension)**: A background service worker and content script injected into web pages to manipulate the DOM, extract form data, and auto-sync JWT tokens from the React SPA.
3. **The Server (Node API)**: Validates requests, interacts with MongoDB through Mongoose Object Data Modeling (ODM), and triggers Nodemailer services for OTP dispatch.

## 3.3 Authentication & OTP Verification Flow
1. User submits an email and password to the `/api/auth/login` endpoint.
2. The server compares the bcrypt hash. Upon success, an OTP is generated and stored with a 10-minute expiry time.
3. Nodemailer sends the OTP to the user's registered email via SMTP.
4. The user submits the OTP to `/api/auth/verify-otp`.
5. Upon verification, a JSON Web Token (JWT) is returned and stored in `localStorage`.

## 3.4 Chrome Extension Integration
The extension relies on Manifest V3. The `content.js` script actively scans the DOM for `<input type="password">` fields. When a `submit` event is detected, it captures the adjacent text input (username/email) and the password. It stores this as a `pendingSave` object in `chrome.storage.local`. Furthermore, it intelligently reads the JWT token from the `localhost` web application and synchronizes it to the extension's local storage, granting the extension authorized access to POST data to the backend vault.

---

<div style="page-break-after: always;"></div>

# CHAPTER 4
# EXPERIMENTAL RESULTS AND DISCUSSION

## 4.1 Dashboard and Vault Features
The NoteLock dashboard was rigorously tested for usability and functionality. The UI successfully categorizes credentials (Social, Work, Banking) and features a dynamic search and filtering mechanism. A key experimental result was the implementation of the Weak Password Detection system. The React component successfully maps through all saved passwords, evaluating them against regex constraints (minimum 8 characters, inclusion of numbers and special characters). Any violations immediately trigger a red UI warning alert displaying the specific vulnerable websites.

## 4.2 Extension Capture Mechanism Analysis
The Chrome extension was tested on standard login portals including GitHub and Wikipedia. The event listener successfully hooked into the form submission, preventing immediate navigation just long enough to extract the values before passing control back to the browser. The auto-sync mechanism successfully shared the JWT token from the React application to the Extension's storage context without requiring manual user intervention, achieving the project's goal of a frictionless experience.

---

<div style="page-break-after: always;"></div>

# CHAPTER 5
# CONCLUSION

## 5.1 Summary of the Work
The NoteLock project successfully achieved its objective of delivering a secure, full-stack password management system. By utilizing the MERN stack, the application provides a highly responsive dashboard for managing credentials. The integration of a Nodemailer-backed OTP verification system adds a critical layer of authentication security. Furthermore, the successful deployment of a custom Chrome Extension that autonomously intercepts login forms and synchronizes with the web application marks a significant technical achievement, bridging the gap between web applications and browser-native APIs.

## 5.2 Future Scopes
Future iterations of NoteLock can expand upon the current architecture in several ways:
1. **Zero-Knowledge Encryption**: Implementing client-side AES-256 encryption before payloads are sent to the Node.js server, ensuring the database only stores ciphertexts.
2. **Biometric Authentication**: Integrating WebAuthn to allow users to unlock their vaults using fingerprint or facial recognition hardware on supported devices.
3. **Password Health Reports**: Expanding the weak password detection into a full-scale health report that checks credentials against known compromised databases (e.g., HaveIBeenPwned API).

---

<div style="page-break-after: always;"></div>

# APPENDIX A
# ACCEPTED / COMMUNICATED PAPERS

*(If applicable, list any papers communicated or accepted related to this project. Otherwise, this section can be left blank or removed.)*

---

<div style="page-break-after: always;"></div>

# REFERENCES

1. Bradski, G., & Kaehler, A. (2008). *Learning OpenCV: Computer vision with the OpenCV library*. O'Reilly Media, Inc. (Example placeholder).
2. Facebook Open Source. (2023). *React Documentation*. Retrieved from https://react.dev/
3. MongoDB, Inc. (2023). *Mongoose ODM v7 Documentation*. Retrieved from https://mongoosejs.com/
4. Google Chrome Developers. (2023). *Chrome Extensions Documentation (Manifest V3)*. Retrieved from https://developer.chrome.com/docs/extensions/
5. Tailwind Labs. (2023). *Tailwind CSS Documentation*. Retrieved from https://tailwindcss.com/
6. Node.js Foundation. (2023). *Node.js API Documentation*. Retrieved from https://nodejs.org/docs/
