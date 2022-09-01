import VideoPlayer from '../components/description/Player';
import VideoDescription from '../components/description/VideoDescription';
import RelatedVideoList from '../components/list/RelatedVideoList';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchVideo } from '../features/video/videoSlice';
import { useParams } from 'react-router-dom';
import Loading from '../components/ui/Loading';

export default function Video() {
    const { video, isError, isLoading, error } = useSelector(
        (state) => state.video
    );
    const dispatch = useDispatch();
    const { videoId } = useParams();

    useEffect(() => {
        dispatch(fetchVideo(videoId));
    }, [dispatch, videoId]);

    const {id, title, description, tags, date, link} = video || {};

    // manage content
    let content;

    if (isLoading) {
        content = <Loading />;
    }

    if (!isLoading && isError) {
        content = <div className="col-span-12">{error}</div>;
    }

    console.log(video)

    if (!isLoading && !isError && video.id) {
        content = (
            <div class="grid grid-cols-3 gap-2 lg:gap-8">
                <div class="col-span-full w-full space-y-8 lg:col-span-2">
                    <VideoPlayer link={link} title={title} />

                    <VideoDescription title={title} date={date} description={description} />
                </div>

                <RelatedVideoList id={id} tags={tags} />
            </div>
        );
    }

    return (
        <section class="pt-6 pb-20">
            <div class="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
                {content}
            </div>
        </section>
    );
}
