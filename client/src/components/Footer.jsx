import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble, BsLinkedin } from 'react-icons/bs';

export default function FooterCom() {
    return (
        <Footer container className='bg-gray-100 dark:bg-gray-900 border-t-8 border-teal-500'>
            <div className='w-full max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
                <div className='flex flex-col sm:flex-row items-center justify-between'>
                    {/* Blog Section */}
                    <div className='mb-6 sm:mb-0 flex items-center'>
                        <Link
                            to='/'
                            className='flex items-center text-lg sm:text-xl font-semibold dark:text-white'
                        >
                            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                                Agri
                            </span>
                            Credit
                        </Link>
                    </div>

                    {/* Footer Links */}
                    <div className='flex flex-col sm:flex-row gap-8 sm:gap-12 text-center sm:text-left'>
                        {/* <div>
                            <Footer.Title title='About' className='text-gray-800 dark:text-gray-300' />
                            <Footer.LinkGroup col>
                                <Footer.Link
                                    href='#'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors'
                                >
                                    100 JS Projects
                                </Footer.Link>
                                <Footer.Link
                                    href='/about'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors'
                                >
                                    Sahand's Blog
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div> */}
                        {/* <div>
                            <Footer.Title title='Follow us' className='text-gray-800 dark:text-gray-300' />
                            <Footer.LinkGroup col>
                                <Footer.Link
                                    href='#'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors'
                                >
                                    Github
                                </Footer.Link>
                                <Footer.Link
                                    href='#'
                                    className='text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors'
                                >
                                    Discord
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div> */}
                        <div>
                            <Footer.Title title='Legal' className='text-gray-800 dark:text-gray-300' />
                            <Footer.LinkGroup col>
                                <Footer.Link
                                    href='/privacypolicy'
                                    className='text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors'
                                >
                                    Privacy Policy
                                </Footer.Link>
                                <Footer.Link
                                    href='/t&c'
                                    className='text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors'
                                >
                                    Terms &amp; Conditions
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
                <Footer.Divider className='border-gray-300 dark:border-gray-600' />
                <div className='flex flex-col sm:flex-row items-center justify-between mt-4'>
                    <Footer.Copyright
                        by="Akhil Anupoju"
                        year={new Date().getFullYear()}
                        className='text-sm text-gray-600 dark:text-gray-400'
                    />
                    <div className='text-sm text-gray-600 dark:text-gray-400'>
                        &copy; {new Date().getFullYear()} All rights reserved.
                    </div>
                    <div className="flex gap-6 mt-4 sm:mt-0">
                        <Footer.Icon
                            href='https://www.linkedin.com/in/akhil-anupoju/'
                            target='_blank'
                            icon={BsLinkedin}
                            className='text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors'
                        />
                        <Footer.Icon
                            href='https://github.com/Akhil-Anupoju'
                            target='_blank'
                            icon={BsGithub}
                            className='text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors'
                        />
                    </div>
                </div>
            </div>
        </Footer>
    );
}
