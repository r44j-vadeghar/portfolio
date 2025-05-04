"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, ImageIcon, Loader2, Star, Upload, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const testimonialSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  designation: z.string().optional(),
  company: z.string().optional(),
  feedback: z
    .string()
    .min(10, { message: "Feedback must be at least 10 characters" }),
  rating: z.coerce.number().min(1).max(5),
  testimonialType: z.enum(["text", "video"]),
});

type TestimonialFormValues = z.infer<typeof testimonialSchema>;

export default function TestimonialSubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      name: "",
      designation: "",
      company: "",
      feedback: "",
      rating: 5,
      testimonialType: "text",
    },
  });

  const watchTestimonialType = form.watch("testimonialType");

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith("video/")) {
      toast.error("Please upload a valid video file");
      return;
    }

    const MAX_FILE_SIZE = 100 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      toast.error("Video file is too large. Maximum size is 100MB.");
      return;
    }

    setVideoFile(file);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file");
      return;
    }

    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      toast.error("Image file is too large. Maximum size is 5MB.");
      return;
    }

    setImageFile(file);
  };

  const removeVideo = () => {
    setVideoFile(null);
    const fileInput = document.getElementById(
      "video-upload"
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const removeImage = () => {
    setImageFile(null);
    const fileInput = document.getElementById(
      "image-upload"
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  async function onSubmit(values: TestimonialFormValues) {
    try {
      setIsSubmitting(true);
      setUploadProgress(10);

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("designation", values.designation || "");
      formData.append("company", values.company || "");
      formData.append("feedback", values.feedback);
      formData.append("rating", values.rating.toString());
      formData.append(
        "isVideo",
        (values.testimonialType === "video").toString()
      );
      if (values.testimonialType === "video" && videoFile) {
        formData.append("file", videoFile);
      } else if (values.testimonialType === "text" && imageFile) {
        formData.append("file", imageFile);
      }

      setUploadProgress(30);

      const response = await fetch("/api/testimonials", {
        method: "POST",
        body: formData,
      });

      setUploadProgress(90);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit testimonial");
      }

      setUploadProgress(100);
      setIsSuccess(true);
      toast.success("Testimonial submitted successfully!");
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to submit testimonial. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="pt-6">
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-8"
            >
              <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
              <h3 className="text-2xl font-bold text-center">Thank You!</h3>
              <p className="text-center text-muted-foreground mt-2">
                Your testimonial has been submitted and will be reviewed soon.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h3 className="text-2xl font-bold mb-6">Share Your Experience</h3>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                  encType="multipart/form-data"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name*</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="designation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Designation</FormLabel>
                          <FormControl>
                            <Input placeholder="Your job title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <Input placeholder="Your company" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rating*</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Button
                                key={star}
                                type="button"
                                variant="ghost"
                                size="sm"
                                className={`p-0 h-8 w-8 ${
                                  star <= field.value
                                    ? "text-yellow-400 hover:text-yellow-500"
                                    : "text-muted-foreground hover:text-muted"
                                }`}
                                onClick={() => field.onChange(star)}
                              >
                                <Star
                                  className={
                                    star <= field.value ? "fill-yellow-400" : ""
                                  }
                                />
                              </Button>
                            ))}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="testimonialType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Testimonial Type*</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => {
                              field.onChange(value);
                              // Reset file selection when changing types
                              if (value === "text") {
                                setVideoFile(null);
                              } else {
                                setImageFile(null);
                              }
                            }}
                            defaultValue={field.value}
                            className="flex items-center space-x-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="text" id="text" />
                              <Label htmlFor="text">Text</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="video" id="video" />
                              <Label htmlFor="video">Video</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {watchTestimonialType === "text" && (
                    <>
                      {/* Image Upload Section for Text Testimonials */}
                      <div className="space-y-4">
                        <FormLabel htmlFor="image-upload">
                          Your Photo (Optional)
                        </FormLabel>

                        {!imageFile ? (
                          <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                            <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground mb-2">
                              Upload a profile image (JPG, PNG, WebP)
                            </p>
                            <p className="text-xs text-muted-foreground mb-4">
                              Maximum file size: 5MB
                            </p>
                            <Input
                              id="image-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageUpload}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() =>
                                document.getElementById("image-upload")?.click()
                              }
                            >
                              Select Image
                            </Button>
                          </div>
                        ) : (
                          <div className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <p className="font-medium truncate">
                                {imageFile.name}
                              </p>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={removeImage}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            <p className="text-xs text-muted-foreground mb-1">
                              {(imageFile.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                            <div className="mt-2">
                              <img
                                src={URL.createObjectURL(imageFile)}
                                alt="Preview"
                                className="h-24 w-24 object-cover rounded-md"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      <FormField
                        control={form.control}
                        name="feedback"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Feedback*</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Share your experience..."
                                className="min-h-32"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  {watchTestimonialType === "video" && (
                    <div className="space-y-4">
                      <FormLabel htmlFor="video-upload">
                        Video Testimonial*
                      </FormLabel>

                      {!videoFile ? (
                        <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">
                            Upload a video (MP4, MOV, WebM)
                          </p>
                          <p className="text-xs text-muted-foreground mb-4">
                            Maximum file size: 100MB
                          </p>
                          <Input
                            id="video-upload"
                            type="file"
                            accept="video/*"
                            className="hidden"
                            onChange={handleVideoUpload}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                              document.getElementById("video-upload")?.click()
                            }
                          >
                            Select Video
                          </Button>
                        </div>
                      ) : (
                        <div className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-medium truncate">
                              {videoFile.name}
                            </p>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={removeVideo}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">
                            {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      )}

                      <FormField
                        control={form.control}
                        name="feedback"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Brief Description*</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Add a brief description about your video testimonial..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={
                      isSubmitting ||
                      (watchTestimonialType === "video" && !videoFile)
                    }
                  >
                    {isSubmitting ? (
                      <>
                        {uploadProgress > 0 ? (
                          <span className="flex items-center">
                            Uploading... {uploadProgress}%
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </span>
                        )}
                      </>
                    ) : (
                      "Submit Testimonial"
                    )}
                  </Button>
                </form>
              </Form>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
