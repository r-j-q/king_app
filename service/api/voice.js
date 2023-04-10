import Request from '../request.js'
const request = new Request().http


const checkPower=data=>{
	return request('voice/check/power',data,'GET',true)
}
const startVoice=data=>{
	return request('voice',data,'POST',true)
}
const joinVoice=data=>{
	return request('voice/'+data.code+'/join',data,'POST',true)
}

const finishVoice=data=>{
	return request('voice/'+data+'/finish','','PUT',true)
}
const getFinish=data=>{
	return request('voice/finished',data,'GET',true)
}

const gethideit=data=>{
	return request('voice/'+data+'/user','','GET',true)
}
const setmicrophone=data=>{
	return request('voice/'+data.code+'/microphone',data,'POST',true)
}

const memsignIn=data=>{
	return request('voice/'+data.code+'/signIn',data,'PUT',true)
}

const otherSignin=data=>{
	return request('voice/'+data.code+'/signIn',data,'POST',true)
}

const finishMeet=data=>{
	return request('voice/'+data.code+'/finish',data,'PUT',true)
}

const exitMeet=data=>{
	return request('voice/'+data.code+'/exit',data,'PUT',true)
}

const RecordSignin=data=>{
	return request('voice/'+data.code+'/signIn',data,'GET',true)
}

const voiceeFfective=data=>{
	return request('voice/effective',data,'GET',true)
}

const voicemeetingName=data=>{
	return request('voice/user/meeting_name','','GET',true)
}


export default {
	checkPower,
	startVoice,
	joinVoice,
	finishVoice,
	getFinish,
	gethideit,
	setmicrophone,
	memsignIn,
	otherSignin,
	finishMeet,
	exitMeet,
	RecordSignin,
	voiceeFfective,
	voicemeetingName
}
