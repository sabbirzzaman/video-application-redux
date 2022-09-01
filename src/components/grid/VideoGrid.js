import VideoGridItem from './VideoGridItem';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchVideos } from '../../features/videos/videosSlice';
import Loading from '../ui/Loading';

export default function VideGrid() {
    const dispatch = useDispatch();
    const { isLoading, isError, videos, error } = useSelector(
        (state) => state.videos
    );

    useEffect(() => {
        dispatch(fetchVideos());
    }, [dispatch]);

    // manage content
    let content;

    if (isLoading) {
        content = <Loading />;
    }

    if (!isLoading && isError) {
        content = <div className="col-span-12">{error}</div>;
    }

    if (!isLoading && !isError && videos.length === 0) {
        content = <div className="col-span-12">No video founded!</div>;
    }

    if (!isLoading && !isError && videos.length > 0) {
        content = videos.map((video) => (
            <VideoGridItem video={video} key={video.id} />
        ));
    }

    console.log(videos)

    return (
        <section className="pt-12">
            <section className="pt-12">
                <div className="grid grid-cols-12 gap-4 max-w-7xl mx-auto px-5 lg:px-0 min-h-[300px]">
                    {content}
                </div>
            </section>
        </section>
    );
}
