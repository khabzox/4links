// app/help/page.tsx

export default function HelpPage() {
  return (
    <div className="p-6 sm:p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Help & Support</h1>
      <p>Welcome to the help section! Here you can find information about how to use the main features of the 4links:</p>
      <ul className="list-disc pl-5 mt-2">
        <li>
          <strong>Creating Short Links:</strong> To create a short link, go to the{" "}
          <a href="/dashboard/short-linker" className="text-blue-600 hover:underline">
            Short Linker
          </a>{" "}
          page. Enter the original URL in the input field and click 'Create Short Link'. There is no limit to the number of short links you can create.
        </li>
        <li>
          <strong>Managing Short Links:</strong> On the{" "}
          <a href="/dashboard/short-linker" className="text-blue-600 hover:underline">
            Short Linker
          </a>{" "}
          page, you can view, edit, or delete your short links. To edit a link, click the edit button next to it, make your changes, and save.
        </li>
        <li>
          <strong>Viewing Analytics:</strong> To view analytics, navigate to the{" "}
          <a href="/dashboard/analytics" className="text-blue-600 hover:underline">
            Analytics
          </a>{" "}
          page. Here you can see various statistics including visitor counts, devices used, creation dates, click history, and geographic locations of the clicks.
        </li>
        <li>
          <strong>Help & Support:</strong> If you need any assistance, please visit the{" "}
          <a href="/contact" className="text-blue-600 hover:underline">
            Contact Support
          </a>{" "}
          page or check the{" "}
          <a href="#faq" className="text-blue-600 hover:underline">
            FAQ
          </a>{" "}
          section.
        </li>
      </ul>
      <p className="mt-4">For more help, visit our{" "}
        <a href="/contact" className="text-blue-600 hover:underline">
          Contact Support
        </a>.
      </p>

      {/* FAQ Section */}
      <div className="mt-6" id="faq">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions (FAQ)</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">How do I create a short link?</h3>
            <p>To create a short link, navigate to the <a href="/dashboard/short-linker" className="text-blue-600 hover:underline">Short Linker</a> page, enter the original URL in the input field, and click 'Create Short Link'.</p>
          </div>
          <div>
            <h3 className="font-semibold">Can I edit a short link after creating it?</h3>
            <p>Yes, you can now edit a short link after it has been created. You can update the destination URL or other details as needed without having to delete the existing link and create a new one.</p>
          </div>
          <div>
            <h3 className="font-semibold">How many short links can I create?</h3>
            <p>There is no limit to the number of short links you can create. You can generate as many short links as you need, without restrictions.</p>
          </div>
          <div>
            <h3 className="font-semibold">What analytics are available for my short links?</h3>
            <p>On the <a href="/dashboard/analytics" className="text-blue-600 hover:underline">Analytics</a> page, you can view statistics such as the number of visitors, the devices they used, creation dates, click history, and the geographic locations of the clicks.</p>
          </div>
          <div>
            <h3 className="font-semibold">How do I contact support?</h3>
            <p>If you need help, visit the <a href="/contact" className="text-blue-600 hover:underline">Contact Support</a> page to reach out to our support team.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
