import React, { useReducer } from 'react'
import { pdfjs, Document, Page } from 'react-pdf'
import { Input, Tooltip, Spin, Space } from 'antd'
import {
  LeftOutlined,
  RightOutlined,
  PlusOutlined,
  MinusOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
} from '@ant-design/icons'
import cls from 'classnames'
import './index.less'

pdfjs.GlobalWorkerOptions.workerSrc = `./pdfJs/2.12.313/pdf.worker.js`

const initialState = {
  pageNumber: 1,
  pageNumberInput: 1,
  pageNumberFocus: false,
  numPages: 1,
  pageWidth: 600,
  fullscreen: false,
}

function reducer(state, action) {
  return { ...state, ...action }
}

export function ReactPDF({
  file,
  error = '加载PDF文件失败。',
  loading = '加载中...',
  noData = '未指定 PDF 文件。',
  className,
  ...props
}) {
  const [
    {
      pageNumber,
      pageNumberInput,
      pageNumberFocus,
      numPages,
      pageWidth,
      fullscreen,
    },
    dispatch,
  ] = useReducer(reducer, initialState)

  const onDocumentLoadSuccess = ({ numPages }) => {
    dispatch({ numPages })
  }

  const lastPage = () => {
    if (pageNumber === 1) {
      return
    }
    const page = pageNumber - 1
    dispatch({ pageNumber: page, pageNumberInput: page })
  }
  const nextPage = () => {
    if (pageNumber === numPages) {
      return
    }
    const page = pageNumber + 1
    dispatch({ pageNumber: page, pageNumberInput: page })
  }
  const onPageNumberFocus = (e) => {
    dispatch({ pageNumberFocus: true })
  }
  const onPageNumberBlur = (e) => {
    dispatch({ pageNumberFocus: false, pageNumberInput: pageNumber });
  };
  const onPageNumberChange = (e) => {
    let value = e.target.value;
    value = value <= 0 ? 1 : value;
    value = value >= numPages ? numPages : value;
    dispatch({ pageNumberInput: value });
  };
  const toPage = (e) => {
    dispatch({ pageNumber: Number(e.target.value) })
  }

  const pageZoomOut = () => {
    if (pageWidth <= 600) {
      return
    }
    dispatch({ pageWidth: pageWidth * 0.8 })
  }
  const pageZoomIn = () => {
    dispatch({ pageWidth: pageWidth * 1.2 })
  }

  const pageFullscreen = () => {
    if (fullscreen) {
      dispatch({ fullscreen: false, pageWidth: 600 })
    } else {
      dispatch({ fullscreen: true, pageWidth: window.screen.width - 40 })
    }
  }

  return (
    <div className={cls('go-pdf-view', className)} {...props}>
      <div className={'go-page-container'}>
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<Spin size="large" tip={loading} />}
          noData={noData}
          error={error}
        >
          <Page
            pageNumber={pageNumber}
            width={pageWidth}
            loading={<Spin size="large" />}
          />
        </Document>
      </div>

      <div className={'go-page-tool'}>
        <Space>
          <Tooltip title={pageNumber === 1 ? '已是第一页' : '上一页'}>
            <LeftOutlined onClick={lastPage} />
          </Tooltip>
          <Input
            value={pageNumberFocus ? pageNumberInput : pageNumber}
            onFocus={onPageNumberFocus}
            onBlur={onPageNumberBlur}
            onChange={onPageNumberChange}
            onPressEnter={toPage}
            type="number"
          />{' '}
          / {numPages}
          <Tooltip title={pageNumber === numPages ? '已是最后一页' : '下一页'}>
            <RightOutlined onClick={nextPage} />
          </Tooltip>
          <Tooltip title="放大">
            <PlusOutlined onClick={pageZoomIn} />
          </Tooltip>
          <Tooltip title="缩小">
            <MinusOutlined onClick={pageZoomOut} />
          </Tooltip>
          <Tooltip title={fullscreen ? '恢复默认' : '适合窗口'}>
            {fullscreen ? (
              <FullscreenExitOutlined onClick={pageFullscreen} />
            ) : (
              <FullscreenOutlined onClick={pageFullscreen} />
            )}
          </Tooltip>
        </Space>
      </div>
    </div>
  )
}
