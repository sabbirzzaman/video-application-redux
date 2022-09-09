import { useGetRelatedVideosQuery } from '../../../features/api/apiSlice';
import RelatedVideoLoader from '../../ui/loaders/RelatedVideoLoader';
import RelatedVideo from './RelatedVideo';

export default function RelatedVideos({ id, title }) {
    const {
        data: relatedVideo,
        isLoading,
        isError,
    } = useGetRelatedVideosQuery({ id, title });

    // manage content
    let content;

    if (isLoading) {
        content = <RelatedVideoLoader />;
    }

    if (!isLoading && !isError && relatedVideo.length === 0) {
        content = (
            <p className="w-full flex items-center justify-center h-10 max-w-7xl mx-auto p-2 text-gray-700 bg-gray-100 col-span-12">
                No related Video Founded!
            </p>
        );
    }

    if (!isLoading && !isError && relatedVideo.length > 0) {
        content = relatedVideo.map((video) => (
            <RelatedVideo key={video.id} video={video} />
        ));
    }

    return (
        <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
            {content}
        </div>
    );
}
