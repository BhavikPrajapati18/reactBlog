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
    const file = data.image[0]
      ? await appwriteService.createFile(data.image[0])
      : null;
    if (post) {
      if (file) appwriteService.deleteFile(post.featuredImage);
      const updatedPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (updatedPost) navigate(`/post/${updatedPost.$id}`);
    } else {
      if (file) {
        const newPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
          featuredImage: file.$id,
        });
        if (newPost) navigate(`/post/${newPost.$id}`);
      }
    }
  };

  const slugTransform = useCallback((value) => {
    return (
      value
        ?.trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-") || ""
    );
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
      className="max-w-3xl mx-auto p-6 bg-white shadow-2xl rounded-xl border border-gray-200 transition-all hover:shadow-md"
    >
      {/* Title & Slug */}
      <div className="space-y-4">
        <Input
          label="Title"
          placeholder="Enter title..."
          className="w-full text-xl font-medium border-none bg-gray-100 focus:ring-2 focus:ring-blue-500"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug"
          placeholder="Auto-generated..."
          className="w-full border-none bg-gray-100 focus:ring-2 focus:ring-green-500"
          {...register("slug", { required: true })}
          onInput={(e) =>
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            })
          }
        />
      </div>

      {/* Content Editor */}
      <div className="mt-6">
        <RTE
          label="Content"
          name="content"
          control={control}
          defaultValue={getValues("content")}
          className="p-3 rounded-lg bg-gray-50 border-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Image Upload & Status */}
      <div className="mt-6 flex items-center gap-4">
        <input
          type="file"
          className="hidden"
          id="image-upload"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        <label
          htmlFor="image-upload"
          className="cursor-pointer text-sm bg-blue-500 text-white px-5 py-2 rounded-full transition-all hover:bg-blue-600"
        >
          Upload Image
        </label>

        <Selector
          options={["active", "inactive"]}
          label="Status"
          className="bg-gray-100 border-none rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
          {...register("status", { required: true })}
        />
      </div>

      {/* Preview Image */}
      {post && (
        <div className="mt-4 rounded-lg overflow-hidden shadow-sm">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt="Post Preview"
            className="rounded-lg transition-all hover:scale-105"
          />
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full mt-6 bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-900 transition-all"
      >
        {post ? "Update Post" : "Publish Post"}
      </Button>
    </form>
  );
}
