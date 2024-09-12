import React, { useState } from "react";
import SEO from "../theme/SEO";

const Contact = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});

	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const validationErrors = validate(formData);
		setErrors(validationErrors);
		if (Object.keys(validationErrors).length === 0) {
			setIsSubmitting(true);
			try {
				const response = await fetch(
					"https://thedevdrawer.com/files/send-email.php", {
						method: "POST",
						header: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(formData)
					}
				)

				console.log(response)

				if(response.ok){
					setSubmitted(true);
				}else{
					setErrors({
						api: "There was an error submitting the form. Please try again."
					})
				}
			} catch (error) {
				setErrors({
					api: "There was an error submitting the form. Please try again."
				})
			} finally {
				setIsSubmitting(false);
			}
		}
	};

	const validate = (values) => {
		let errors = {};

		if (!values.name.trim()) {
			errors.name = "Name is required";
		}

		if (!values.email.trim()) {
			errors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(values.email)) {
			errors.email = "Email address is invalid";
		}

		if (!values.message.trim()) {
			errors.message = "Message is required";
		}

		return errors;
	};

	if (submitted) {
		return <div style={{ textAlign: "center" }}>Thanks</div>;
	}

	return (
		<div>
			<SEO title={"Contact Us"} description={"This is a sample description"} />
			<h1>Contact</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="name">Name</label>
					<input
						type="text"
						id="name"
						value={formData.name}
						onChange={handleChange}
						className="form-control"
					/>
					{errors.name && <span className="error">{errors.name}</span>}
				</div>
				<div>
					<label htmlFor="email">Email Address</label>
					<input
						type="text"
						id="email"
						value={formData.email}
						onChange={handleChange}
						className="form-control"
					/>
					{errors.email && <span className="error">{errors.email}</span>}
				</div>
				<div>
					<label htmlFor="message">Message</label>
					<textarea
						id="message"
						value={formData.message}
						onChange={handleChange}
						className="form-control"
						rows="10"></textarea>
					{errors.message && <span className="error">{errors.message}</span>}
				</div>
				<br />
				<button
					type="submit"
					className="btn btn-primary"
					disabled={isSubmitting}>
					Submit
				</button>
				{errors.api && <div className="error">{errors.api}</div>}
			</form>
		</div>
	);
};

export default Contact;
