import React from 'react';
import { UploadCloud } from 'lucide-react';

export default function Content() {
  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-playfair font-bold text-white mb-2">Add Content</h1>
        <p className="text-gray-300 mb-8">Upload your creative work to share with the world.</p>

        <div className="bg-gray-800 border border-gray-700 p-8 rounded-2xl">
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-white mb-2">Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
                  placeholder="Enter a title for your content"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-white mb-2">Description</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
                  placeholder="Tell us more about your content"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Content Type</label>
                <select className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white bg-transparent focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all">
                  <option value="video" className="bg-gray-800">Video</option>
                  <option value="music" className="bg-gray-800">Music</option>
                  <option value="photo" className="bg-gray-800">Photo</option>
                  <option value="blog" className="bg-gray-800">Blog</option>
                  <option value="template" className="bg-gray-800">Template</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-white mb-2">Upload File</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-400">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-transparent rounded-md font-medium text-rose-400 hover:text-rose-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-rose-500"
                      >
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB. MP4, MOV up to 100MB.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all"
              >
                Submit for Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
