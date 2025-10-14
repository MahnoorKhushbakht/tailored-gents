import '@/app/css/style.css';
import Rating from '@mui/material/Rating';


export default async function CommentListSkeleton() {
    return (
       <>
       <h2 className='text-white mt-8 font-bold antialiased'>Real People, Real Style</h2>
       <p className='text-white antialiased'>Explore our customers <strong className="text-amber-500 ">reviews</strong> to see how they’re loving our products. Get inspired to enhance your <strong className="text-amber-500">wardrobe</strong>.</p>

          <div className="flex flex-col scrollContainer animate-pulse ">
            {[1].map((post,index) => (
                <div key={index} className="mb-4 bg-gray-800 rounded-lg p-4 shadow-md ">
                    <Rating
                        size='large'
                        sx={{
                            '& .MuiRating-iconFilled': {
                                color: 'yellow',
                            },
                            '& .MuiRating-iconEmpty': {
                                color: '#94a3b8', 
                            },
                        }}
                        value={post.rating}
                        margintop={2}
                    />
                    <p className="text-slate-300 text-lg font-semibold mt-2">{post.name}</p>
                    <p className="text-slate-300">{post.comment}</p>
                </div>
            ))}
        </div>
    
          </>
    );
}