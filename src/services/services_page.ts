import { serverPageFetchRequest } from "../config/APIConfig";

export const fetchPageData = async (
    pageSlug: string,
    revalidationValue: number = 0,
) => {
    return await serverPageFetchRequest(
        `cms/pages/${pageSlug}`,
        revalidationValue
    );
};