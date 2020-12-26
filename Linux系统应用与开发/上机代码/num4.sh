date
echo  “Input  a  user  name  for  searching”
read  name
if  who|grep  “$name” 
then
		echo  “Lucky, there  is  $name in  my  system  now.”
			echo  “Hi,how are you!” > /var/spool/mail/$name
		else  echo  “Unlucky, there  is not  $name in  my  system.”
fi

