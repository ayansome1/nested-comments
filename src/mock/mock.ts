export const mockComments = [
  {
    id: '1',
    content: 'hello 1',
    isRoot: true,
    children: ['1.1'],
  },
  {
    id: '2',
    content: 'hello 2',
    isRoot: true,
    children: [],
  },
  {
    id: '1.1',
    content: 'hello 1.1',
    isRoot: false,
    children: ['1.1.1'],
  },
  {
    id: '1.1.1',
    content: 'hello 1.1.1',
    isRoot: false,
    children: ['1.1.1.1'],
  },
  {
    id: '1.1.1.1',
    content: 'hello 1.1.1.1',
    isRoot: false,
    children: [],
  },
];

// export const mockComments = [
//   {
//     id: '1',
//     content: 'hi 1',
//     replies: [
//       {
//         id: '1.1',
//         content: 'hi 1.1',
//         replies: [
//           {
//             id: '1.1.1',
//             content: 'hi 1.1.1',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: '2',
//     content: 'hi 2',
//     replies: [
//       {
//         id: '2.1',
//         content: 'hi 2.1',
//         replies: [
//           {
//             id: '2.1.1',
//             content: 'hi 2.1.1',
//           },
//         ],
//       },
//     ],
//   },
// ];
