import { Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getPosts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  return (
    <div className="w-full overflow-x-auto p-">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <Table hoverable className="w-full shadow-lg rounded-lg">
          <Table.Head className="bg-blue-500 text-white">
            <Table.HeadCell>Date Updated</Table.HeadCell>
            <Table.HeadCell>Time Updated</Table.HeadCell>
            <Table.HeadCell>Post Image</Table.HeadCell>
            <Table.HeadCell>Post Title</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            <Table.HeadCell>Edit</Table.HeadCell>
          </Table.Head>
          {userPosts.map((post) => (
            <Table.Body key={post._id} className="divide-y">
              <Table.Row className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700">
                <Table.Cell className="px-4 py-2">
                  {new Date(post.updatedAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell className="px-4 py-2">
                  {new Date(post.updatedAt).toLocaleTimeString()}
                </Table.Cell>
                <Table.Cell className="px-4 py-2">
                  <Link to={`/post/${post.slug}`}>
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-20 h-12 object-cover rounded-full shadow-md"
                    />
                  </Link>
                </Table.Cell>
                <Table.Cell className="px-4 py-2">
                  <Link
                    className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                    to={`/post/${post.slug}`}
                  >
                    {post.title}
                  </Link>
                </Table.Cell>
                <Table.Cell className="px-4 py-2">{post.category}</Table.Cell>
                <Table.Cell className="px-4 py-2">
                  <span className="font-medium text-red-500 hover:underline cursor-pointer">
                    Delete
                  </span>
                </Table.Cell>
                <Table.Cell className="px-4 py-2">
                  <Link
                    className="font-medium text-green-500 hover:underline cursor-pointer"
                    to={`/update-post/${post._id}`}
                  >
                    Edit
                  </Link>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
      ) : (
        <p className="text-gray-500 text-center">No posts</p>
      )}
    </div>
  );
};

export default DashPosts;
