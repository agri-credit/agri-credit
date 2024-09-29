import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Modal, Table } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashPosts() {
    const { currentUser } = useSelector((state) => state.user)
    const [userPosts, setUserPosts] = useState([])
    const [showMore, setShowMore] = useState(true)
    const [showModal, setShowModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState('');

    const handleShowMore = async () => {
        const startIndex = userPosts.length;
        try {
            const res = await fetch(
                `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
            );
            const data = await res.json();
            if (res.ok) {
                setUserPosts((prev) => [...prev, ...data.posts]);
                if (data.posts.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };


    const handleDeletePost = async () => {
        setShowModal(false);
        try {
            const res = await fetch(
                `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
                {
                    method: 'DELETE',
                }
            );
            const data = await res.json();
            //console.log(data)
            if (!res.ok) {
                console.log(data.message);
            } else {
                setUserPosts((prev) =>
                    prev.filter((post) => post._id !== postIdToDelete)
                );
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`)
                const data = await res.json()
                //console.log(data)
                if (res.ok) {
                    setUserPosts(data.posts)
                    if (data.posts.length < 9) {
                        setShowMore(false);
                    }
                }
            } catch (err) {
                console.log(err.message)
            }
        }
        if (currentUser.isAdmin) {
            fetchPosts()
        }
    }, [currentUser._id])

    const truncateTitle = (title, maxLength) => {
        return title.length > maxLength ? title.slice(0, maxLength) + '...' : title;
    };

    //console.log(userPosts)
    return (
        <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
            {currentUser.isAdmin && userPosts.length > 0
                ?
                (
                    <>
                        <Table hoverable className='shadow-md'>
                            <Table.Head>
                                <Table.HeadCell>Date Updated</Table.HeadCell>
                                <Table.HeadCell>Post Image</Table.HeadCell>
                                <Table.HeadCell>Post Title</Table.HeadCell>
                                <Table.HeadCell>Category</Table.HeadCell>
                                <Table.HeadCell>Delete</Table.HeadCell>
                                <Table.HeadCell>
                                    <span className="">Edit</span>
                                </Table.HeadCell>
                            </Table.Head>
                            {userPosts.map((post) => (
                                <Table.Body className='divide-y'>
                                    <Table.Row>
                                        <Table.Cell>
                                            {new Date(post.updatedAt).toLocaleDateString()}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Link
                                                to={`/post/${post.slug}`}>
                                                <img
                                                    src={post.image}
                                                    alt={post.title}
                                                    className='w-20 h-10 object-cover bg-gray-500 rounded-lg'
                                                />
                                            </Link>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Link
                                                className='font-medium text-gray-700 dark:text-white'
                                                to={`/post/${post.slug}`}
                                            >
                                                {truncateTitle(post.title, 40)}
                                            </Link>
                                        </Table.Cell>
                                        <Table.Cell >
                                            <Link
                                                to={`/post/${post.slug}`}
                                                className="flex flex-row space-x-2"
                                            >
                                                <div className="flex items-center justify-center bg-gray-200 text-gray-700 dark:text-gray-100 dark:bg-[rgb(33,42,67)] px-3 p-1 rounded-full">
                                                    {post.category[0]}
                                                </div>
                                                {post.category[1] && <div className="flex items-center justify-center bg-gray-200 text-gray-700 dark:text-gray-100 dark:bg-[rgb(33,42,67)] px-3 p-1 rounded-full">
                                                    {post.category[1]}
                                                </div>}
                                                {post.category.length > 2 && <div className="flex items-center justify-center bg-gray-300 dark:bg-[rgb(33,42,67)] text-gray-700 dark:text-gray-100 px-3 p-1 rounded-full">
                                                    <span>+{post.category.length - 2}</span>
                                                </div>}
                                            </Link>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <span
                                                onClick={() => {
                                                    setShowModal(true);
                                                    setPostIdToDelete(post._id);
                                                }}
                                                className='font-medium text-red-500 hover:underline cursor-pointer'
                                            >
                                                Delete
                                            </span>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Link
                                                className='text-teal-500 hover:underline'
                                                to={`/update-post/${post._id}`}
                                            >
                                                <span>Edit</span>
                                            </Link>
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            ))}
                        </Table>
                        {
                            showMore &&
                            (
                                <button
                                    onClick={handleShowMore}
                                    className='w-full text-teal-500 self-center text-sm py-7'>
                                    Show more
                                </button>
                            )
                        }
                    </>
                )
                :
                (
                    <p>no post</p>
                )
            }
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                popup
                size='md'
            >
                <Modal.Header />
                <Modal.Body>
                    <div className='text-center'>
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                            Are you sure you want to delete this post?
                        </h3>
                        <div className='flex justify-center gap-4'>
                            <Button
                                color='failure'
                                onClick={handleDeletePost}
                            >
                                Yes, I'm sure
                            </Button>
                            <Button
                                color='gray'
                                onClick={() => setShowModal(false)}
                            >
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
