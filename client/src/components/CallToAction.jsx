import { Button } from 'flowbite-react';
import FoldableMap from './UI/FoldableMap';

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-2 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className="flex-1 pl-5 justify-center flex flex-col">
            <h2 className='text-2xl mb-5'>
                Check out my portfolio
            </h2>
            <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target='_blank' rel='noopener noreferrer'>
                    portfolio site
                </a>
            </Button>
        </div>
        <div className="p-2">
            <FoldableMap/>
        </div>
    </div>
  )
}