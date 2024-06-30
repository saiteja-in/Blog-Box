import { Button, FileInput, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import { Input } from 'flowbite-react';

const CreatePost = () => {
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-3xl text-center my-7 font-bold">Create a Post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            id="title"
            label="Title"
            placeholder="Title"
            className="flex-1"
          />
          <Select id="category" label="Category">
            <option value="uncategorized">select a category</option>
            <option value="movies">Movies</option>
            <option value="tvshows">TV Shows</option>
            <option value="sports">Sports</option>
            <option value="technology">Technology</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput type="file" accept="image/*" />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
          >
            Submit
          </Button>
        </div>
        <ReactQuill
          theme="snow"
          placeholder="Write something"
          className="h-72 mb-11"
          required
        />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Publish
        </Button>
      </form>
    </div>
  );
};
export default CreatePost;
