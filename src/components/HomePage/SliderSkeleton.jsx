import Skeleton from "react-loading-skeleton";

const SliderSkeleton = () => {
	return (
		<div className="slider">
			<div className="slideContainer">
				{Array(9)
					.fill()
					.map((_, index) => (
						<div
							key={index}
							className="renderIfVisible"
							style={{ display: "flex" }}
						>
							<div className="slide">
								<Skeleton
									style={{
										position: "absolute",
										height: "100%",
										width: "100%",
									}}
								/>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default SliderSkeleton;
