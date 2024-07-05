import { TOKEN, MYPROFILE, TYPEOFTEACHING, GRADES, COURSES, SUBJECTS } from './constants';
import { jwtDecode } from 'jwt-decode';

// TOKEN LOCAL ACCIONS //
export function setToken(token){
    localStorage.setItem(TOKEN, token);
}

export function getToken(){
    return localStorage.getItem(TOKEN);
}

export function decodeToken(token){
    return jwtDecode(token);
}

export function removeToken(){
    localStorage.removeItem(TOKEN);
}
///////////////////////

// MY PROFILE LOCAL ACCIONS //
export function setProfile(myprofile){
    localStorage.setItem(MYPROFILE, JSON.stringify(myprofile));
}

export function getProfile(){
    return localStorage.getItem(JSON.parse(MYPROFILE))
}

export function removeProfile(){
    localStorage.removeItem(MYPROFILE)
}
//////////////////////////////

// TYPE OF TEACHING //
export function setTypeOfTeaching(typeOfTeaching){
    localStorage.setItem(TYPEOFTEACHING, JSON.stringify(typeOfTeaching));
}

export function getTypeOfTeaching(){
    return localStorage.getItem(TYPEOFTEACHING)
}

export function removeTypeOfTeaching(){
    localStorage.removeItem(TYPEOFTEACHING)
}
/////////////////////

// GRADE LOCAL ACCIONS //
export function setLocalGrades(grades){
    localStorage.setItem(GRADES, JSON.stringify(grades));
}

export function getLocalGrades(){
    return localStorage.getItem(GRADES)
}

export function removeLocalGrades(){
    localStorage.removeItem(GRADES)
}
/////////////////////

// COURSES LOCAL ACCIONS //
export function setLocalCourses(courses){
    localStorage.setItem(COURSES, JSON.stringify(courses));
}

export function getLocalCourses(){
    return localStorage.getItem(COURSES)
}

export function removeLocalCourses(){
    localStorage.removeItem(COURSES)
}
/////////////////////

// SUBJECTS LOCAL ACCIONS //
export function setLocalSubjects(subjects){
    localStorage.setItem(SUBJECTS, JSON.stringify(subjects));
}

export function getLocalSubjects(){
    return localStorage.getItem(SUBJECTS)
}

export function removeLocalSubjects(){
    localStorage.removeItem(COURSES)
}
/////////////////////