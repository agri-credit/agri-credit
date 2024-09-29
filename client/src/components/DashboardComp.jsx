import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    HiAnnotation,
    HiArrowNarrowUp,
} from 'react-icons/hi';
import { IoDocumentText } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { Button, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function DashboardComp() {
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);
    const [posts, setPosts] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    const [lastMonthUsers, setLastMonthUsers] = useState(0);
    const [lastMonthPosts, setLastMonthPosts] = useState(0);
    const [lastMonthComments, setLastMonthComments] = useState(0);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('/api/user/getusers?limit=5');
                const data = await res.json();
                if (res.ok) {
                    setUsers(data.users);
                    setTotalUsers(data.totalUsers);
                    setLastMonthUsers(data.lastMonthUsers);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        const fetchPosts = async () => {
            try {
                const res = await fetch('/api/post/getposts?limit=5');
                const data = await res.json();
                if (res.ok) {
                    setPosts(data.posts);
                    setTotalPosts(data.totalPosts);
                    setLastMonthPosts(data.lastMonthPosts);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        const fetchComments = async () => {
            try {
                const res = await fetch('/api/comment/getcomments?limit=5');
                const data = await res.json();
                if (res.ok) {
                    setComments(data.comments);
                    setTotalComments(data.totalComments);
                    setLastMonthComments(data.lastMonthComments);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        if (currentUser.isAdmin) {
            fetchUsers();
            fetchPosts();
            fetchComments();
        }
    }, [currentUser]);

    return (
        <div className='p-6 md:mx-auto max-w-screen-lg'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {/* Stats Cards */}
                {[
                    {
                        title: 'Total Users',
                        count: totalUsers,
                        lastMonth: lastMonthUsers,
                        icon: <FaUsers className='text-3xl' />,
                        bgColor: 'bg-teal-600'
                    },
                    {
                        title: 'Total Comments',
                        count: totalComments,
                        lastMonth: lastMonthComments,
                        icon: <HiAnnotation className='text-3xl' />,
                        bgColor: 'bg-indigo-600'
                    },
                    {
                        title: 'Total Posts',
                        count: totalPosts,
                        lastMonth: lastMonthPosts,
                        icon: <IoDocumentText className='text-3xl' />,
                        bgColor: 'bg-lime-600'
                    },
                ].map((item, index) => (
                    <div
                        key={index}
                        className={`flex items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 ${item.bgColor}`}
                    >
                        <div className='flex items-center justify-center w-16 h-16 rounded-full bg-white dark:bg-gray-900 p-2'>
                            {item.icon}
                        </div>
                        <div className='ml-4'>
                            <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>{item.title}</h3>
                            <p className='text-3xl font-bold text-gray-900 dark:text-gray-100'>{item.count}</p>
                            <div className='text-sm flex items-center mt-2'>
                                <HiArrowNarrowUp className='text-green-400' />
                                <span className='ml-1 text-gray-700 dark:text-gray-300'>{item.lastMonth}</span>
                                <span className='ml-2 text-gray-500 dark:text-gray-400'>Last month</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tables */}
            <div className='flex flex-wrap gap-4 py-3 mx-auto justify-center'>
                {/* Recent Users */}
                <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
                    <div className='flex justify-between  p-3 text-sm font-semibold'>
                        <h1 className='text-center p-2'>Recent users</h1>
                        <Button outline gradientDuoTone='purpleToPink'>
                            <Link to={'/dashboard?tab=users'}>See all</Link>
                        </Button>
                    </div>
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>User image</Table.HeadCell>
                            <Table.HeadCell>Username</Table.HeadCell>
                        </Table.Head>
                        {users &&
                            users.map((user) => (
                                <Table.Body key={user._id} className='divide-y'>
                                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                        <Table.Cell>
                                            <img
                                                src={user.profilePicture}
                                                alt='user'
                                                className='w-10 h-10 rounded-full bg-gray-500'
                                            />
                                        </Table.Cell>
                                        <Table.Cell>{user.username}</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            ))}
                    </Table>
                </div>
                <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
                    {/* Recent Comments */}
                    <div className='flex justify-between  p-3 text-sm font-semibold'>
                        <h1 className='text-center p-2'>Recent comments</h1>
                        <Button outline gradientDuoTone='purpleToPink'>
                            <Link to={'/dashboard?tab=comments'}>See all</Link>
                        </Button>
                    </div>
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>Comment content</Table.HeadCell>
                            <Table.HeadCell>Likes</Table.HeadCell>
                        </Table.Head>
                        {comments &&
                            comments.map((comment) => (
                                <Table.Body key={comment._id} className='divide-y'>
                                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                        <Table.Cell className='w-80'>
                                            <p className='line-clamp-2'>{comment.content}</p>
                                        </Table.Cell>
                                        <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            ))}
                    </Table>
                </div>
                <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
                    {/* Recent Posts */}
                    <div className='flex justify-between  p-3 text-sm font-semibold'>
                        <h1 className='text-center p-2'>Recent posts</h1>
                        <Button outline gradientDuoTone='purpleToPink'>
                            <Link to={'/dashboard?tab=posts'}>See all</Link>
                        </Button>
                    </div>
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>Post image</Table.HeadCell>
                            <Table.HeadCell>Post Title</Table.HeadCell>
                            <Table.HeadCell>Category</Table.HeadCell>
                        </Table.Head>
                        {posts &&
                            posts.map((post) => (
                                <Table.Body key={post._id} className='divide-y'>
                                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                        <Table.Cell>
                                            <img
                                                src={post.image}
                                                alt='post'
                                                className='w-14 h-10 rounded-md bg-gray-500'
                                            />
                                        </Table.Cell>
                                        <Table.Cell className='w-80'>
                                            <p className='line-clamp-1'>{post.title}</p>
                                        </Table.Cell>
                                        <Table.Cell >
                                            <div className="flex gap-1 items-center">
                                                {post.category.slice(0, 2).map((cat, index) => (
                                                    <span
                                                        key={index}
                                                        className=" bg-gray-200 text-gray-700 dark:text-gray-100 dark:bg-[rgb(33,42,67)] px-3 p-1 rounded-full"
                                                    >
                                                        {cat}
                                                    </span>
                                                ))}
                                                {post.category.length > 2 && (
                                                    <span className=" bg-gray-200 text-gray-700 dark:text-gray-100 dark:bg-[rgb(33,42,67)]  px-3 p-1 rounded-full ">
                                                        +{post.category.length - 2}
                                                    </span>
                                                )}
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            ))}
                    </Table>
                </div>
            </div>
        </div>
    );
}
