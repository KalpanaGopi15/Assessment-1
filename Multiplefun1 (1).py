class multifun():
    # calculate triangle
    def areatriangle():
        h=int(input("Height:"))
        b=int(input("Breadth:"))
        area=((h*b)/2)
        print("Area of Triangle formula is: (Height*breadth)/2")
        return "the area of triangle is",area
    
    def peritriangle():
        h1=int(input("Height1:"))
        h2=int(input("Height2:"))
        b1=int(input("Breadth:"))
        peri=(h1+h2+b1)
        print("The perimeter of triangle formula is :Height1+Height2+Breadth")
        return "The perimeter of triangle is",peri
    
    
    #print statement
    def subfields():
        lists=["Machine Learning",
           "Neural Networks",
           "vision",
           "Robotics",
           "Speech Processing",
           "Natural Language Processing"]
        for i in lists:
            print(i)
        
    
    #calculate percentage
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

    
    #odd or even    
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



    
    