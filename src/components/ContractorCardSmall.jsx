import _ from 'lodash';
import { styled } from '@mui/system';

const Root = styled('div')({
  margin: 10,
  display: 'flex',
  padding: 10,
  borderRadius: 10,
  textAlign: 'left',
  maxWidth: 400,
  gap: 20,
  backgroundColor: 'white',
  alignItems: 'center',
  boxShadow: 'rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px',
  cursor: 'pointer',
});

const ProfilePicture = styled('img')({
  width: '85px',
  borderRadius: 5
});

const DetailsContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 12
});

const Name = styled('div')({
  fontSize: 16,
  fontWeight: 500
});

const SkillsContainer = styled('div')({
  display: 'flex',
  gap: 5,
  flexWrap: 'wrap'
})

const Address = styled('div')({
  fontSize: 12,
  textTransform: 'uppercase'
});

const Skill = styled('div')({
  fontSize: 9,
  padding: '5px 10px',
  borderRadius: 15,
  textTransform: 'uppercase',
  backgroundColor: '#e9e9e9'
})

const ContractorCardSmall = ({ item, onClick }) =>  {
  const address = _.get(item, 'contractorInfo.address') || {};
  const profilePictureUrl = _.get(item, 'contractorInfo.picture');
  const skills = _.get(item, 'contractorInfo.skills') || [];

  return (
    <Root
      key={item.id}
      onClick={() => { onClick(item.id) }}
    >
      <ProfilePicture src={profilePictureUrl} />
      <DetailsContainer>
        <Name>
          {item.name}
        </Name>
        <Address>
          {address.street_address},
          {' ' + address.city}
        </Address>
        <SkillsContainer>
          {
            skills.map((item) => (
              <Skill>
                {item}
              </Skill>
            ))
          }
        </SkillsContainer>
      </DetailsContainer>
    </Root>
  )
};

export default ContractorCardSmall;
