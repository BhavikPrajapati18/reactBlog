import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Selector, RTE, Input } from "../index";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import appwriteService from "../../appwrite/config";

export default function PostForm({ post }) {
  const { handleSubmit, register, watch, control, getValues, setValue } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appwriteService.createFile(data.image[0])
        : null;
      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = data.image[0]
        ? await appwriteService.createFile(data.image[0])
        : null;
      if (file) {
        data.featuredImage = file.$id;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue, slugTransform]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="max-w-4xl mx-auto p-10 bg-white rounded-2xl shadow-lg border border-gray-200 space-y-8"
    >
      <h2 className="text-3xl font-bold text-center mb-4">
        {post ? "Edit Your Post" : "Create New Post"}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Text Inputs */}
        <div className="space-y-6">
          <Input
            label="Title :"
            placeholder="Enter your post title"
            className="w-full text-xl font-medium border border-gray-300 bg-gray-50 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            {...register("title", { required: true })}
          />
          <Input
            label="Slug :"
            placeholder="Auto-generated slug"
            className="w-full border border-gray-300 bg-gray-100 px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-500"
            {...register("slug", { required: true })}
            onInput={(e) =>
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              })
            }
          />
          <RTE
            label="Content :"
            name="content"
            control={control}
            defaultValue={getValues("content")}
            className="w-full p-4 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-purple-500"
          />
          <Selector
            options={["active", "inactive"]}
            label="Status"
            className="w-full bg-gray-50 border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
            {...register("status", { required: true })}
          />
        </div>
        {/* Right Column - File Upload & Preview */}
        <div className="space-y-6">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-8">
            <input
              type="file"
              className="hidden"
              id="image-upload"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("image", { required: !post })}
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer text-lg bg-blue-600 text-white px-6 py-3 rounded-full shadow-md transition-all hover:bg-blue-700"
            >
              Upload Image
            </label>
          </div>
          {post && (
            <div className="rounded-xl overflow-hidden shadow-md border border-gray-200">
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          )}
        </div>
      </div>
      <div>
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold py-4 rounded-full shadow-lg hover:opacity-90 transition-all"
        >
          {post ? "Update Post" : "Publish Post"}
        </Button>
      </div>
    </form>
  );
}
