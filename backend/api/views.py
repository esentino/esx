from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import BuildingSerializer, UserSerializer, NoteSerializer
from .models import Note, Building
from rest_framework.permissions import IsAuthenticated, AllowAny


# Create your views here.

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)
    

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class BuildingListView(generics.ListAPIView):
    queryset = Building.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = BuildingSerializer
