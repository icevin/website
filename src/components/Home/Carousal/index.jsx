import React from 'react';

// width of each img in px
// needs to be updated if style.scss changes
const IMAGE_WIDTH = 360;
const ITEMS_PER_SECTION = 4;

export default class Carousal extends React.Component {
	constructor(props) {
		super(props);

		const numItems = this.props.images.length;
		const sections = [];
		this.sectionWidth = (IMAGE_WIDTH * ITEMS_PER_SECTION / 2);

		for (let i = 0; i < numItems; i += ITEMS_PER_SECTION) {
			sections.push({
				left: (i / ITEMS_PER_SECTION) * this.sectionWidth,
				width: this.sectionWidth,
				items: this.props.images.slice(i, i + 4).map((item, i) => <a href={item} target="_BLANK" key={i}><div style={{backgroundImage: 'url('+item+')'}} /></a>),
			});
		}

		this.timer = null;
		this.state = {
			sections,
		};
	}

	componentDidMount() {
		this.timer = setInterval(() => {
			this.setState({
				sections: this.state.sections.map(section => {
					section.left -= 1;
					if (section.left < -this.sectionWidth) {
						section.left = (this.state.sections.length - 1) * this.sectionWidth - 1;
					}
					return section;
				})
			});
		}, 90);
	}

	componentWillUnmount() {
		clearInterval(this.timer);
		this.timer = null;
	}

	render() {
		return (
			<div id="carousal">
				<div id="carousal-inner">
					{this.state.sections.map((section, i) =>
						<div className="carousal-sect" style={{ left: section.left + 'px', width: section.width + 'px' }} key={i}>
							{ section.items }
						</div>
					)}
				</div>
			</div>
		);
	}
}