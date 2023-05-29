import { Controller } from '@/application/controllers';
import { RequestHandler } from 'express';

export const adaptExpressRoute = (controller: Controller): RequestHandler => {
  return async (req, res) => {
    const httpResponse = await controller.handle({ ...req.body });
    if (httpResponse.statusCode === 200) {
      res.status(200).json(httpResponse);
    } else {
      res
        .status(httpResponse.statusCode)
        .json({ error: httpResponse.data.message });
    }
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
