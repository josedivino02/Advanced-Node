import { Controller } from '@/application/controllers';
import { RequestHandler } from 'express';

export const adaptExpressRoute = (controller: Controller): RequestHandler => {
  return async (req, res) => {
    const { data, statusCode } = await controller.handle({ ...req.body });
    const json = statusCode === 200 ? data : { error: data.message };
    res.status(statusCode).json(json);
  };
};

// export const adaptExpressRoute = (controller: Controller): RequestHandler => {
//   return (req, res) => {
//     controller
//       .handle({ ...req.body })
//       .then((httpResponse) => {
//         if (httpResponse.statusCode === 200) {
//           res.status(200).json(httpResponse);
//         } else {
//           res
//             .status(httpResponse.statusCode)
//             .json({ error: httpResponse.data.message });
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//         res.status(500).json({ error: error.data.message });
//       });
//   };
// };
