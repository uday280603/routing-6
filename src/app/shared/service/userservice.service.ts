import { Observable, of } from "rxjs";

import { Injectable } from "@angular/core";
import { Ires } from "../model/Ires";
import { Iuser } from "../model/Iuser";






@Injectable({
    providedIn :'root'
})
export class UserService{
    constructor(){}
    usersArray : Iuser[] = [
  {
    userName: 'Rohit Sharma',
    userId: '100001',
    userRole: 'Frontend Developer',
    profileImage:
      'https://th.bing.com/th/id/OIP.AbGafkazjc_S1pZPh0B9cQHaIm?w=179&h=208&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3',
    profileDescription:
      'Passionate Frontend Developer with expertise in Angular and modern web technologies.',
    skills: ['Css', 'Html', 'Angular'],
    experienceYears: '4',
    isActive: true,
    address: {
      current: {
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        zipCode: '411001',
      },
      permanent: {
        city: 'Nashik',
        state: 'Maharashtra',
        country: 'India',
        zipCode: '422001',
      },
    },
    isAddSame: false,
  },
  {
    userName: 'Ritika Sharma',
    userId: '100002',
    userRole: 'Backend Developer',
    profileImage:
      'https://th.bing.com/th/id/OIP.AbGafkazjc_S1pZPh0B9cQHaIm?w=179&h=208&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3',
    profileDescription:
      'Experienced Backend Developer specializing in scalable APIs and database management.',
    skills: ['Node.js', 'Express', 'MongoDB'],
    experienceYears: '3',
    isActive: false,
    address: {
      current: {
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        zipCode: '400001',
      },
      permanent: {
        city: 'Pune',
        state: 'Maharashtra',
        country: 'India',
        zipCode: '400001',
      },
    },
    isAddSame: true,
  },
];

fetchAllUsers() : Observable<Iuser[]>{
    return of (this.usersArray)
}

getUserById(userId : string) : Observable<Iuser>{
  let UserObj = this.usersArray.find(u => u.userId === userId)!;
  return of(UserObj)
}

removeUser(removeId : string) : Observable<Ires<Iuser>>{
  let GETINDEX = this.usersArray.findIndex(u => u.userId === removeId);
  let arr = this.usersArray.splice(GETINDEX,1);
  return of({
    msg : `The user with id ${removeId} is removed successfully...!`,
    data : arr[0]
  })
}

onAddUser(new_obj : Iuser) : Observable<Ires<Iuser>>{
  this.usersArray.unshift(new_obj)
  return of ({
    msg : `The user with id ${new_obj.userId} is added succcessfullu..!`,
    data : new_obj
  })
}

onUpdateUser(updatedObj : Iuser) : Observable<Ires<Iuser>>{
  let GETINDEX = this.usersArray.findIndex(u => u.userId === updatedObj.userId);
  this.usersArray[GETINDEX] = updatedObj;
  return of({
    msg : `The user with id ${updatedObj.userId} is updated successfully..!`,
    data : updatedObj
  })
}
}