import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../configs/firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

export const useFirebaseUpload = () => {
  const [progress, setProgress] = useState(0); // 진행률
  const [downloadUrl, setDownloadUrl] = useState(null); // 파이어베이스가 반환해주는 이미지 url 경로
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // folder: crew-img / profile-img / feed-img
  const uploadFile = async (file, folder) => {
    // 파일이나 폴더 명이 없는 경우 아무 것도 안함
    if (!file || !folder) {
      return;
    }

    // 상태 초기화
    setIsUploading(true); // 이미지 업로드 시작
    setProgress(0);
    setError(null);
    setDownloadUrl(null);

    // 파일 이름
    const fileName = `${uuidv4()}.${file.name.split(".").pop()}`;
    // 파일 저장 경로
    const storageRef = ref(storage, `/${folder}/${fileName}`);

    // 업로드 태스크 생성 (진행률 확인 가능)
    const uploadTask = uploadBytesResumable(storageRef, file);

    // 업로드 시작
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // 스냅샷: 이벤트 발생 시점의 작업 상태
        // 진행률: (이 스냅샷을 생성한 시점까지 전송된 총 바이트 수/ 업로드가 예정된 총 바이트 수) * 100
        const currentProgress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(currentProgress);
      },
      (error) => {
        console.error("파일 업로드 실패", error);
        setError(error);
        setIsUploading(false);
      },
      async () => {
        // 업로드 성공
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        setDownloadUrl(downloadUrl);
        setIsUploading(false);
      }
    );
  };
  return { progress, downloadUrl, error, isUploading, uploadFile };
};
