class multifun():
    def percentage():
        sub1=int(input("Enter the mark of subject1:"))
        sub2=int(input("Enter the mark of subject2:"))
        sub3=int(input("Enter the mark of subject3:"))
        sub4=int(input("Enter the mark of subject4:"))
        sub5=int(input("Enter the mark of subject5:"))
        tot=(sub1+sub2+sub3+sub4+sub5)
        per=tot/5
        temp="Ur Total marks are",tot,"and percentage is",per
        return temp
        
    def oddeven():
        num=int(input("enter the number:"))
        if(num%2==0):
            print("The given number",num, "is even")
            revar="the no is even"
        else:
            print("The given number",num,"is odd")
            revar="the no is odd"
        return revar
    
    # eligibility for marriage
    
    
    def eligibility():
        gender=input("Ener the gender")
        age=int(input("Enter the age:"))
        if((gender=='Male')&(age>=21)):
            print("you r eligible")
            msg="Eligible for adult",age
        elif((gender=='Female')&(age>=18)):
            print("you r eligible")
            msg="ELIGIBLE",age
        else:
            print("u r not eligible")
            msg="not eligible",age
        return msg


#calculate percentage
    
    