import React from 'react';
import {shallow} from 'enzyme';
import Login from '../components/Login';

const houses=[
    {
        "id": 1,
        "name": "houseA"
    },
    {
        "id": 2,
        "name": "houseB"
    },
    {
        "id": 3,
        "name": "houseC"
    },
    {
        "id": 4,
        "name": "houseD"
    }
]

test('Login component renders correctly with correct props', () => {

	const login = shallow(
	<Login login={()=>{}}
		homes={houses}
		handleChange={()=>{}}
		name={"testUserName"}
		surName={"testLastName"}
		selectedHome={houses[0]}
		loadingState={false}
		validate={true}
	/>);

	expect(login.find('input').length).toEqual(2);
	expect(login.find('button').length).toEqual(1);
	expect(login.find('option').length).toEqual(4);
	expect(login.find('help-block').length).toEqual(0);
  });

  test('Login component renders correctly with missing props', () => {

	const login = shallow(
	<Login login={()=>{}}
		homes={houses}
		handleChange={()=>{}}
		name={null}
		surName={null}
		selectedHome={houses[0]}
		loadingState={false}
		validate={true}
	/>);

	expect(login.find('input').length).toEqual(2);
	expect(login.find('button').length).toEqual(1);
	expect(login.find('option').length).toEqual(4);
	expect(login.find('.help-block').length).toEqual(2);

  });
