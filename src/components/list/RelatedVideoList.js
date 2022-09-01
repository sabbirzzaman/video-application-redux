import RelatedVideoListItem from './RelatedVideoListItem';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchRelatedVideos } from '../../features/relatedVideos/relatedVideosSlice';
import Loading from '../ui/Loading';

export default function RelatedVideoList({ id, tags }) {
    const dispatch = useDispatch();
    const { relatedVideos, isLoading, isError, error } = useSelector((state) => state.relatedVideos);

    useEffect(() => {
        dispatch(fetchRelatedVideos({ tags, id }));
    }, [dispatch, tags, id]);

    // manage content
    let content;

    if (isLoading) {
        content = <Loading />;
    }

    if (!isLoading && isError) {
        content = <div className="col-span-12">{error}</div>;
    }

    if (!isLoading && !isError && relatedVideos.length === 0) {
        content = <div className="col-span-12">No video founded!</div>;
    }

    if (!isLoading && !isError && relatedVideos.length > 0) {
        content = relatedVideos.map((video) => (
            <RelatedVideoListItem video={video} key={video.id} />
        ));
    }

    return (
        <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
            {content}
        </div>
    );
}
