import React from 'react';

import './QuestionImageComponent.css';

function QuestionImageComponent(props) {
	const { questionId, profileImg, addImageHandler } = props;

	const imageHandler = (e) => {
		const reader = new FileReader();
		reader.onload = () => {
			if (reader.readyState === 2) {
				addImageHandler(questionId, reader.result);
			}
		};
		reader.readAsDataURL(e.target.files[0]);
	};

	return (
		<div className='container'>
			<input
				class='image-input'
				type='file'
				accept='image/*'
				name='image-upload'
				id={`input-${questionId}`}
				onChange={imageHandler}
			/>
			<div className='label'>
				<label className='image-upload' htmlFor={`input-${questionId}`}>
					Click to add Image
				</label>
			</div>
			{profileImg && (
				<div className='img-holder'>
					<img src={profileImg} alt='' id='img' className='img' />
				</div>
			)}
		</div>
	);
}

export default QuestionImageComponent;
