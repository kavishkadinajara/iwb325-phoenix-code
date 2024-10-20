const PrivacyPolicyPage = () => {
    return (
      <div className="flex flex-col md:flex-row min-h-screen px-4 pt-20 -mb-10">
        <div className="flex flex-col justify-center items-center w-full my-4 z-10">
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mt-2 tracking-widest uppercase"
          >
            Privacy Policy
          </h1>
          <p className="uppercase tracking-widest text-sm text-center text-blue-100 max-w-80 mb-6">
            Your privacy matters to us
          </p>
          <div className="text-white max-w-7xl text-sm md:text-[17px] leading-relaxed space-y-4 px-4">
            <p>
              At EVENTURE, we are committed to safeguarding the privacy of our users. This Privacy Policy outlines how we collect, use, disclose, and protect your personal information when you use our platform.
            </p>
            <h2 className="text-xl md:text-3xl  font-semibold mt-6">Information We Collect</h2>
            <p>
              When you use EVENTURE, we may collect the following types of information:
            </p>
            <ul className="list-disc list-inside">
              <li><strong>Personal Information:</strong> Information such as your name, email address, contact details, and payment information when you purchase tickets or register for events.</li>
              <li><strong>Event Data:</strong> Information related to events you create, attend, or participate in through the platform.</li>
              <li><strong>Usage Data:</strong> Details of your interactions with our platform, such as logins, page views, and activity on the site.</li>
            </ul>
            <h2 className="text-xl md:text-3xl  font-semibold mt-6">How We Use Your Information</h2>
            <p>
              We use the information collected for the following purposes:
            </p>
            <ul className="list-disc list-inside">
              <li>To provide and maintain the EVENTURE platform.</li>
              <li>To process and manage your ticket purchases and event registrations.</li>
              <li>To communicate with you regarding your account, events, and important updates.</li>
              <li>To improve and personalize your experience on EVENTURE based on your interactions.</li>
            </ul>
            <h2 className="text-xl md:text-3xl  font-semibold mt-6">Sharing of Information</h2>
            <p>
            EVENTURE does not share your personal information with third parties except in the following cases:
            </p>
            <ul className="list-disc list-inside">
              <li>With event organizers for managing event-related activities.</li>
              <li>With service providers who assist in payment processing or platform maintenance, under strict confidentiality agreements.</li>
              <li>When required by law or to protect the rights and safety of EVENTURE users.</li>
            </ul>
            <h2 className="text-xl md:text-3xl  font-semibold mt-6">Data Security</h2>
            <p>
              We take the security of your personal data seriously. EVENTURE employs industry-standard security measures such as encryption and access controls to protect your information from unauthorized access.
            </p>
            <h2 className="text-xl md:text-3xl  font-semibold mt-6">Your Rights</h2>
            <p>
              You have the right to access, update, or delete your personal information stored on EVENTURE. If you wish to exercise these rights, you may contact our support team for assistance.
            </p>
            <h2 className="text-xl md:text-3xl  font-semibold mt-6">Changes to This Policy</h2>
            <p>
            EVENTURE reserves the right to update this Privacy Policy from time to time. We will notify users of any changes by updating the &ldquo;Last Updated&rdquo; date at the top of this page. Users are encouraged to review this policy periodically.
            </p>
            <h2 className="text-xl md:text-3xl  font-semibold mt-6">Contact Us</h2>
            <p>
              If you have any questions or concerns about our Privacy Policy, please contact us at <a href="mailto:contact@supunsathsara.com" className="text-blue-400">contact@supunsathsara.com</a>.
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default PrivacyPolicyPage;