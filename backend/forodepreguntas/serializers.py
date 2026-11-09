from django.contrib.auth import get_user_model
from rest_framework import serializers, generics
from rest_framework.permissions import AllowAny

User = get_user_model()

class RegistroSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
    write_only=True, min_length=8)
    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    
class RegistroView(generics.CreateAPIView):
    serializer_class = RegistroSerializer
    permission_classes = [AllowAny]
     