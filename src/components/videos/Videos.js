import { useGetVideosQuery } from '../../features/api/apiSlice';
import Error from '../ui/Error';
import VideoLoader from '../ui/loaders/VideoLoader';
import Video from './Video';

export default function Videos() {
    const { data: videos, isLoading, isError } = useGetVideosQuery();

    // manage content
    let content;

    if(isLoading && !isError) {
        content = <>
            <VideoLoader />
            <VideoLoader />
            <VideoLoader />
            <VideoLoader />
        </>
    }

    if(!isLoading && isError) {
        content = <Error />
    }

    if(!isLoading && !isError && videos.length === 0) {
        content = <p>No Video Founded</p>
    }

    if(!isLoading && !isError && videos.length > 0) {
        content = videos.map(video => (
            <Video key={video.id} video={video} />
        ))
    }

    return content;
}
