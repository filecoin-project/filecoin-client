import * as Data from "~/node_common/data";


export const getRandomSlateElement = async ({id}) => {
    const query = await Data.getSlateById({id});
    return query.data.objects[Math.floor(Math.random() * query.data.objects.length)].url;
}
