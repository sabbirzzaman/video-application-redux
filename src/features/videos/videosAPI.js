const axios = require("../../utils/axios")

export const getVideos = async () => {
    const res = await axios.get('/videos');

    return res.data;
}