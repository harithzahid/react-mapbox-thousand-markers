import _ from 'lodash';
import { styled } from '@mui/system';

import { objectToString } from 'src/utils';

const ProfilePicture = styled('img')({
  width: '100%',
  borderRadius: 5,
  marginTop: 20
})

const OtherDetails = styled('div')({
  fontSize: 13
});

const SkillsContainer = styled('div')({
  display: 'flex',
  gap: 10
});

const Skill = styled('div')({
  fontSize: 12,
  padding: 10,
  borderRadius: 5,
  backgroundColor: '#e9e9e9'
});

const ContractorCardBig = ({ item, onClose }) => {
  const address = _.get(item, 'contractorInfo.address') || {};
  const profilePictureUrl = _.get(item, 'contractorInfo.picture');
  const emailText = _.get(item, 'contractorInfo.contact_email');
  const phoneNoText = _.get(item, 'contractorInfo.contact_number');
  const introText = _.get(item, 'contractorInfo.intro');
  const skills = _.get(item, 'contractorInfo.skills') || [];

  const addressText = objectToString(address, ', ');

  return (
    <>
      <ProfilePicture src={profilePictureUrl} />
      <h2>
        {item.name}
      </h2>
      <OtherDetails>
        {emailText}
      </OtherDetails>
      <OtherDetails>
        {phoneNoText}
      </OtherDetails>
      <OtherDetails>
        {addressText}
      </OtherDetails>
      <p>
        {introText}
      </p>
      <SkillsContainer>
        {
          skills.map((item) => (
            <Skill>
              {item}
            </Skill>
          ))
        }
      </SkillsContainer>
    </>
  )
}

export default ContractorCardBig;
