// ========== Response
// import all modules
import { parse } from 'url';
import { ResponseFunc } from '../types';
import { config } from '../config';

export const response: ResponseFunc = (req, res, responseResult) => {
  if (responseResult.results && responseResult.pageInfo && Array.isArray(responseResult.results)) {
    const {
      query: {
        page = 1,
        ...rest
      },
      pathname,
    } = parse(req.url, true);
    const queries = { ...rest, page };

    return res.status(responseResult.status).json({
      ...responseResult,
      pageInfo: {
        totalData: responseResult.pageInfo?.totalData,
        totalPages: responseResult.pageInfo?.totalPages,
        previousLink: (page > 1) ? `${config.apiUrl}${pathname}?${Object.keys(queries).map((item, index) => `${item}=${item === 'page' ? Number(Object.values(queries)[index]) - 1 : Object.values(queries)[index]}`).join('&')}` : null,
        nextLink: (page < responseResult.pageInfo?.totalPages) ? `${config.apiUrl}${pathname}?${Object.keys(queries).map((item, index) => `${item}=${item === 'page' ? Number(Object.values(queries)[index]) + 1 : Object.values(queries)[index]}`).join('&')}` : null,
      },
    });
  }

  if (responseResult.results && !Array.isArray(responseResult.results)) {
    return res.status(responseResult.status).json(responseResult);
  }

  return res.status(responseResult.status).json(responseResult);
};
