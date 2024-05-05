//my post component

//임시 데이터 - DB에서 가져오기
const myPosts = [
  {
    title: 'mypost1',
    content: 'this is my post1',
  },
  {
    title: 'mypost2',
    content: 'this is my post2',
  },
  {
    title: 'mypost3',
    content: 'this is my post3',
  },
  {
    title: 'mypost4',
    content: 'this is my post4',
  },
];

export default function MyPostList() {
  return (
    <ul>
      {myPosts.map((each) => {
        return <li>{each.title}</li>;
      })}
    </ul>
  );
}
