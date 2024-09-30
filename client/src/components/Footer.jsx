import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsGithub, BsLinkedin } from "react-icons/bs";

export default function FooterCom() {
  return (
    <Footer
      container
      className="bg-green-50 dark:bg-green-900 border-t-8 border-teal-500"
    >
      <div className="w-full max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          {/* Blog Section */}
          <div className="mb-6 sm:mb-0 flex items-center">
            <Link
              to="/"
              className="flex items-center text-lg sm:text-xl font-semibold text-green-800 dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-green-500 via-green-600 to-green-700 rounded-lg text-white">
                Agri
              </span>
              Credit
            </Link>
          </div>

          {/* Footer Links */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 text-center sm:text-left">
            <div>
              <Footer.Title
                title="Legal"
                className="text-green-800 dark:text-green-300"
              />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="/privacypolicy"
                  className="text-green-600 dark:text-green-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
                >
                  Privacy Policy
                </Footer.Link>
                <Footer.Link
                  href="/t&c"
                  className="text-green-600 dark:text-green-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
                >
                  Terms &amp; Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider className="border-green-300 dark:border-green-600" />
        <div className="flex flex-col sm:flex-row items-center justify-between mt-4">
          <Footer.Copyright
            by="Akhil Anupoju"
            year={new Date().getFullYear()}
            className="text-sm text-green-600 dark:text-green-400"
          />
          <div className="text-sm text-green-600 dark:text-green-400">
            &copy; {new Date().getFullYear()} All rights reserved.
          </div>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <Footer.Icon
              href="https://www.linkedin.com/in/akhil-anupoju/"
              target="_blank"
              icon={BsLinkedin}
              className="text-green-600 dark:text-green-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
            />
            <Footer.Icon
              href="https://github.com/Akhil-Anupoju"
              target="_blank"
              icon={BsGithub}
              className="text-green-600 dark:text-green-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}
