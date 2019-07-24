/* eslint-disable jsx-a11y/alt-text */
import React from 'react'

import styled from 'styled-components'

import Layout from '../components/Layout/Layout'
import MenuBar from '../components/MenuBar'

import Add24 from '@carbon/icons-react/es/add/24'

import { Search } from 'carbon-components-react'

import keithGoodwin from '../assets/keith-goodwin.png'
import jillFourie from '../assets/jill-fourie.png'
import kristinWisnewski from '../assets/kristin-wisnewski.png'
import liaFazio from '../assets/lia-fazio.png'
import ginniRometty from '../assets/ginni-rometty.png'

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	margin: 10px 0;

	padding: 40px 30px;
`

const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	width: 100%;

	margin-bottom: 20px;

	h1 {
		font-size: xx-large;
	}
`

const Messages = styled.div`
	margin-top: 10px;
`

const Selected = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	justify-content: center;

	border-bottom: 1px solid #b6b6b6;

	background-color: #f2f4f9;

	padding: 10px 5px;

	h3 {
		margin: 10px 0;

		font-weight: bold;
	}

	p {
		line-height: 1.5;
	}

	img {
		width: 60px;
    	margin: 10px 15px;
	}
`

const Message = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	justify-content: center;

	border-bottom: 1px solid #b6b6b6;

	padding: 10px 5px;

	h3 {
		margin: 10px 0;

		font-weight: bold;
	}

	p {
		line-height: 1.5;
	}

	img {
		width: 60px;
    	margin: 10px 15px;
	}
`

const Content = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
`

const ChatPage = (props) => {
	return (
		<Layout>
			<Wrapper>
				<Header>
					<h1>Messages</h1>

					<Add24 />
				</Header>
				<Search
					name=""
					defaultValue=""
					labelText="Search"
					closeButtonLabelText=""
					placeHolderText="Search"
					id=""
				/>
				<Messages>
					<Selected>
						<img src={keithGoodwin} />
						<Content>
							<h3>Keith Goodwin</h3>
							<p>Sorry Stephen, I don’t have time. Please stop bothering me.</p>
						</Content>
					</Selected>
					{/* <Selected>
						<img src={kristinWisnewski} />
						<Content>
							<h3>Kristin Wisnewski</h3>
							<p>Sure. Great to meet you, too!</p>
						</Content>
					</Selected> */}
					<Message>
						<img src={ginniRometty} />
						<Content>
							<h3>Ginni Rometty</h3>
							<p>Hey Ginni, I want to be CEO one day! Do you need an assistant?</p>
						</Content>
					</Message>
					<Message>
						<img src={jillFourie} />
						<Content>
							<h3>Jill Fourie</h3>
							<p>Hi Jill, I came across your profile and would love to get lunch. Are you free this week?</p>
						</Content>
					</Message>
					<Message>
						<img src={liaFazio} />
						<Content>
							<h3>Lia Fazio</h3>
							<p>I’m obviusly the best intern. Can I get a raise?</p>
						</Content>
					</Message>
				</Messages>
			</Wrapper>
			<MenuBar />
		</Layout>
	)
}

export default ChatPage
